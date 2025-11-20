// src/app/api/rsvps/route.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'rsvps'), {
      name,
      message,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error('Erro ao salvar a confirmação de presença: ', error);
    return NextResponse.json({ error: 'Ocorreu um erro ao salvar a confirmação de presença.' }, { status: 500 });
  }
}
