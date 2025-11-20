'use client';
import { useState, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Heart, Send } from 'lucide-react';

export function RsvpSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      toast({
        title: 'Obrigado!',
        description: 'Sua presença foi confirmada.',
      });
      setIsSubmitted(true);
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Oops! Algo deu errado.',
        description: 'Não foi possível confirmar sua presença. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="container max-w-lg text-center">
        <Card className="shadow-lg p-8 bg-card rounded-2xl">
            <CardHeader>
                <div className="mx-auto bg-primary rounded-full p-4 w-fit text-primary-foreground mb-4">
                    <Heart className="h-10 w-10" />
                </div>
                <CardTitle className="font-display text-3xl">Obrigado!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-lg">Sua presença foi confirmada com sucesso!</p>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-lg">
      <div className="text-center mb-10 stagger-item" style={{'--delay': '0ms'} as React.CSSProperties}>
          <h2 className="font-display text-4xl md:text-5xl">Confirmar Presença</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Sua presença é o maior presente que podemos receber. Por favor, confirme sua participação.
          </p>
      </div>
      <Card className="shadow-lg bg-card rounded-2xl stagger-item" style={{'--delay': '150ms'} as React.CSSProperties}>
        <CardContent className="p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" placeholder="Seu nome completo" required className="bg-background rounded-lg focus:border-primary" onChange={(e) => setName(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Deixe sua mensagem</Label>
                <Textarea id="message" name="message" placeholder="Deixe uma mensagem carinhosa para os noivos..." rows={3} className="bg-background rounded-lg focus:border-primary" onChange={(e) => setMessage(e.target.value)} />
              </div>
              
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full text-lg py-7 rounded-full shadow-lg hover:shadow-primary/40 transition-shadow">
                {isSubmitting ? 'Enviando...' : 'Confirmar Presença e Enviar Mensagem'}
                <Send className="ml-2 h-5 w-5" />
            </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
