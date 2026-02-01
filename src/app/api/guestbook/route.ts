// src/app/api/guestbook/route.ts
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Robust Firebase initialization for both local and App Hosting environments
let app: FirebaseApp;
if (!getApps().length) {
  try {
    // For App Hosting, env vars are automatically picked up by initializeApp()
    app = initializeApp();
  } catch (e) {
    // Fallback for local development
    app = initializeApp(firebaseConfig);
  }
} else {
  app = getApp();
}
const db = getFirestore(app);


export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || typeof name !== 'string' || !message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Nome e mensagem são obrigatórios.' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "guestbook"), {
      name: name,
      message: message,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Recado recebido com sucesso!", id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ error: 'Erro ao enviar o recado.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return NextResponse.json(messages, { status: 200 });

  } catch (error) {
    console.error("Error fetching documents: ", error);
    return NextResponse.json({ error: 'Erro ao buscar os recados.' }, { status: 500 });
  }
}
