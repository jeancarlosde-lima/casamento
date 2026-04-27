import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Inicialização robusta do Firebase para ambientes local e App Hosting
let app: FirebaseApp;
if (!getApps().length) {
  try {
    // No App Hosting, as variáveis de ambiente são detectadas automaticamente
    app = initializeApp();
  } catch (e) {
    // Fallback para desenvolvimento local
    app = initializeApp(firebaseConfig);
  }
} else {
  app = getApp();
}
const db = getFirestore(app);

/**
 * Rate limiting simples em memória para prevenir abuso da API.
 * Limita cada IP a 30 requisições por minuto.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

/**
 * Sanitiza o input de busca para prevenir injeção.
 * Remove caracteres especiais e limita o tamanho.
 */
function sanitizeSearchInput(input: string): string {
  return input
    .trim()
    .slice(0, 50) // Limita a 50 caracteres
    .replace(/[^\p{L}\p{N}\s'-]/gu, ''); // Permite apenas letras, números, espaços, hífens e apóstrofos
}

/**
 * GET /api/guests?search=<termo>
 * Busca convidados pelo nome (case-insensitive).
 */
export async function GET(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em 1 minuto.' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawSearch = searchParams.get('search');

  if (!rawSearch) {
    return NextResponse.json({ error: 'Termo de busca é obrigatório' }, { status: 400 });
  }

  // Sanitiza o input antes de usar na query
  const search = sanitizeSearchInput(rawSearch);
  if (search.length < 2) {
    return NextResponse.json({ error: 'Termo muito curto. Digite pelo menos 2 caracteres.' }, { status: 400 });
  }

  try {
    const guestsRef = collection(db, 'guests');
    // Busca case-insensitive usando campo normalizado
    const q = query(
      guestsRef,
      where('name_lowercase', '>=', search.toLowerCase()),
      where('name_lowercase', '<=', search.toLowerCase() + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const guests = querySnapshot.docs.map((d) => ({
      id: d.id,
      name: d.data().name,
      party_size: d.data().party_size,
      isConfirmed: d.data().isConfirmed || false,
      // Não expõe outros campos do documento (princípio de menor privilégio)
    }));

    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar convidados:', error);
    return NextResponse.json({ error: 'Erro ao buscar convidados.' }, { status: 500 });
  }
}

/**
 * POST /api/guests
 * Confirma a presença de um convidado pelo ID.
 */
export async function POST(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em 1 minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { guestId } = body;

    // Validação do guestId: deve ser string alfanumérica (IDs do Firestore)
    if (!guestId || typeof guestId !== 'string' || !/^[a-zA-Z0-9]{10,30}$/.test(guestId)) {
      return NextResponse.json({ error: 'ID do convidado inválido.' }, { status: 400 });
    }

    const guestRef = doc(db, 'guests', guestId);
    await updateDoc(guestRef, {
      isConfirmed: true,
      confirmedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Presença confirmada com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao confirmar presença:', error);
    return NextResponse.json({ error: 'Erro ao confirmar presença.' }, { status: 500 });
  }
}
