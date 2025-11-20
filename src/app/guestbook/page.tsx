'use client';
import { useEffect } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

function getInitials(name: string) {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function GuestbookPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const guestbookQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'guest_book_entries'),
        orderBy('createdAt', 'desc')
    );
  }, [firestore]);


  const { data: rsvps, isLoading } = useCollection<GuestBookEntry>(guestbookQuery);

  useEffect(() => {
    if (!user && !isUserLoading) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  return (
    <div className="bg-background min-h-screen">
       <div className="container mx-auto p-4 md:p-8">
        <div className="text-center my-8 md:my-16">
            <h1 className="font-display text-4xl md:text-6xl text-foreground">Livro de Visitas</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                Leia as mensagens de carinho deixadas por nossos amigos e familiares.
            </p>
        </div>

        {isLoading ? (
           <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-card p-6 animate-pulse">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-full bg-muted"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/3 rounded bg-muted"></div>
                                <div className="h-4 w-full rounded bg-muted"></div>
                                <div className="h-4 w-3/4 rounded bg-muted"></div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {rsvps && rsvps.length > 0 ? (
              rsvps.map((rsvp) => (
                <Card key={rsvp.id} className="bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarFallback>{getInitials(rsvp.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{rsvp.name}</p>
                            {rsvp.message && (
                                <p className="mt-2 text-muted-foreground italic">"{rsvp.message}"</p>
                            )}
                             <p className="text-xs text-muted-foreground/80 mt-3">
                                {new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card">
                 <CardContent className="p-10 text-center text-muted-foreground">
                    <p>Nenhuma mensagem ainda. Seja o primeiro a deixar uma!</p>
                 </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
