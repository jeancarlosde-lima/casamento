'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface GuestbookMessage {
    id: string;
    name: string;
    message: string;
    createdAt: any;
}

export default function GuestbookPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
        const response = await fetch('/api/guestbook');
        if(response.ok) {
            const data = await response.json();
            setMessages(data);
        } else {
            console.error('Failed to fetch messages');
             toast({
                variant: 'destructive',
                title: 'Erro ao carregar recados',
                description: 'Não foi possível buscar os recados. A página pode não funcionar como esperado.',
            });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
            variant: 'destructive',
            title: 'Erro de conexão',
            description: 'Não foi possível conectar ao servidor para buscar os recados.',
        });
    } finally {
        setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        variant: 'destructive',
        title: 'Oops! Campos obrigatórios.',
        description: 'Por favor, preencha seu nome e a mensagem.',
      });
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setStatus('success');
        toast({ title: 'Recado enviado!', description: 'Obrigado por deixar sua mensagem.' });
        setName('');
        setMessage('');
        fetchMessages(); // Refresh messages list
        setStatus('idle');
      } else {
        throw new Error('Falha ao enviar o recado.');
      }
    } catch (error) {
      setStatus('error');
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar.',
        description: 'Não foi possível enviar seu recado. Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="bg-background min-h-screen">
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center mb-8">
                <Button asChild variant="ghost" size="icon" className="mr-4">
                    <Link href="/">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <h1 className="font-display text-4xl md:text-5xl text-foreground">Livro de Recados</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="md:order-2">
                    <Card className="shadow-lg bg-card">
                        <CardHeader>
                        <CardTitle className="font-display text-3xl flex items-center">
                            <MessageSquare className="mr-3 h-7 w-7"/>
                            Deixe seu Recado
                        </CardTitle>
                        <CardDescription>Sua mensagem ficará registrada para sempre em nossa história.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Seu nome</Label>
                                    <Input
                                    id="name"
                                    placeholder="Como devemos te chamar?"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={status === 'loading'}
                                    required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Sua mensagem</Label>
                                    <Textarea
                                    id="message"
                                    placeholder="Escreva aqui suas felicitações, lembranças ou conselhos..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={status === 'loading'}
                                    required
                                    rows={5}
                                    />
                                </div>
                                <Button type="submit" disabled={status === 'loading'} size="lg">
                                    {status === 'loading' ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                                    </> 
                                    ) : (
                                    'Enviar Mensagem'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Messages List Section */}
                <div className="md:order-1">
                    <h2 className="font-display text-3xl text-foreground mb-6">Recados Recebidos</h2>
                    {isLoadingMessages ? (
                         <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                            <span className="ml-4 text-muted-foreground">Carregando recados...</span>
                        </div>
                    ) : messages.length > 0 ? (
                        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
                            {messages.map((msg) => (
                                <Card key={msg.id} className="bg-card/50 shadow-sm transition-transform hover:scale-[1.02]">
                                    <CardContent className="p-6">
                                        <p className="text-foreground mb-4 break-words">{msg.message}</p>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <p className="font-semibold text-primary">- {msg.name}</p>
                                            <p>{msg.createdAt ? format(new Date(msg.createdAt.seconds * 1000), "dd/MM/yyyy 'às' HH:mm") : ''}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Nenhum recado ainda.</p>
                            <p className="text-sm text-muted-foreground/80">Seja o primeiro a deixar uma mensagem!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
