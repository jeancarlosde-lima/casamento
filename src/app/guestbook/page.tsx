// src/app/guestbook/page.tsx
'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Rsvp {
  id: string;
  name: string;
  message?: string;
}

export default function GuestbookPage() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchRsvps = async () => {
        const querySnapshot = await getDocs(collection(db, 'rsvps'));
        const rsvpsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Rsvp[];
        setRsvps(rsvpsData);
      };

      fetchRsvps();
    }
  }, [isAuthenticated]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Use um valor do ambiente para a senha
    if (password === process.env.NEXT_PUBLIC_GUESTBOOK_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Digite a senha"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirmações de Presença</h1>
      <ul>
        {rsvps.map(rsvp => (
          <li key={rsvp.id} className="mb-2 p-2 border rounded">
            <p className="font-semibold">{rsvp.name}</p>
            {rsvp.message && <p className="text-gray-600">{rsvp.message}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
