import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
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

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Função para buscar convidados
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json({ error: 'Termo de busca é obrigatório' }, { status: 400 });
  }

  try {
    const guestsRef = collection(db, 'guests');
    // Use name_lowercase for case-insensitive search
    const q = query(
      guestsRef,
      where('name_lowercase', '>=', search.toLowerCase()),
      where('name_lowercase', '<=', search.toLowerCase() + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const guests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error('Error searching guests: ', error);
    return NextResponse.json({ error: 'Erro ao buscar convidados.' }, { status: 500 });
  }
}

// Função para confirmar a presença
export async function POST(request: Request) {
  try {
    const { guestId } = await request.json();

    if (!guestId) {
      return NextResponse.json({ error: 'ID do convidado é obrigatório.' }, { status: 400 });
    }

    const guestRef = doc(db, 'guests', guestId);
    await updateDoc(guestRef, {
      isConfirmed: true,
      confirmedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Presença confirmada com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Error confirming guest: ', error);
    return NextResponse.json({ error: 'Erro ao confirmar presença.' }, { status: 500 });
  }
}
