'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import HTMLFlipBook from 'react-pageflip';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

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

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode, number: number }>((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                {props.children}
                <div className="page-footer">
                    <p>{props.number + 1}</p>
                </div>
            </div>
        </div>
    );
});
Page.displayName = 'Page';

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <div className="page-cover-content">
                {props.children}
            </div>
        </div>
    );
});
PageCover.displayName = 'PageCover';


export default function GuestbookPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect(() => {
    if (rsvps) {
        setTotalPages(rsvps.length > 0 ? rsvps.length + 1 : 1); // +1 for the cover
    }
  }, [rsvps]);

  const handlePageFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const goToNextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goToPrevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };
  
  const bookWidth = 500;
  const bookHeight = 650;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center my-8 md:my-12">
            <h1 className="font-display text-4xl md:text-6xl text-foreground">Livro de Visitas</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                Vire as páginas para ler as mensagens de carinho.
            </p>
        </div>

        {isLoading ? (
            <div className="flex items-center justify-center" style={{ width: `${bookWidth}px`, height: `${bookHeight}px` }}>
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
        ) : (
          <div className="flex flex-col items-center">
            <div 
                className="flip-book" 
                style={{ width: '100%', maxWidth: `${bookWidth}px`, height: `${bookHeight}px`}}
            >
              {rsvps && (
                <HTMLFlipBook
                    width={bookWidth}
                    height={bookHeight}
                    size="stretch"
                    minWidth={300}
                    maxWidth={bookWidth}
                    minHeight={400}
                    maxHeight={bookHeight}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={handlePageFlip}
                    ref={bookRef}
                    className="mx-auto"
                >
                    <PageCover>
                        <BookOpen className="h-24 w-24 text-primary" />
                        <h2 className="font-display text-3xl mt-4 text-foreground">Mensagens</h2>
                        <p className="text-muted-foreground mt-2">de nossos queridos convidados</p>
                        <p className="font-display text-4xl text-primary mt-8">Eloisa & Jean</p>
                    </PageCover>

                    {rsvps.map((rsvp, index) => (
                        <Page key={rsvp.id} number={index + 1}>
                             <div className="page-header">
                                <Avatar>
                                    <AvatarFallback>{getInitials(rsvp.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground text-lg">{rsvp.name}</p>
                                    <p className="text-xs text-muted-foreground/80">
                                        {new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            {rsvp.message && (
                                <p className="text-muted-foreground italic text-base leading-relaxed">"{rsvp.message}"</p>
                            )}
                        </Page>
                    ))}
                </HTMLFlipBook>
              )}
            </div>
             <div className="flex items-center justify-center gap-4 mt-8">
                <Button onClick={goToPrevPage} disabled={currentPage === 0} variant="outline" size="icon">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <span className="text-muted-foreground font-medium">
                    Página {currentPage} de {totalPages > 0 ? totalPages -1 : 0}
                </span>
                <Button onClick={goToNextPage} disabled={currentPage >= totalPages - 1} variant="outline" size="icon">
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
            <Button asChild variant="link" className="mt-8">
                <Link href="/">Voltar para o início</Link>
            </Button>
          </div>
        )}
      </div>
  );
}
