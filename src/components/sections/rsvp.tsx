'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { RsvpState, submitRsvp } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Heart, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full text-lg py-7 rounded-full shadow-lg hover:shadow-primary/40 transition-shadow">
      {pending ? 'Enviando...' : 'Confirmar Presença'}
      <Send className="ml-2 h-5 w-5" />
    </Button>
  );
}

export function RsvpSection() {
  const initialState: RsvpState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitRsvp, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Oops! Algo deu errado.',
        description: state.message,
      });
    }
    if (state.message && state.success) {
      toast({
        title: 'Obrigado!',
        description: state.message,
      });
      formRef.current?.reset();
    }
  }, [state, toast]);
  
  if (state.success) {
    return (
      <section id="rsvp" className="py-16 md:py-24 bg-card">
        <div className="container max-w-lg text-center">
            <Card className="shadow-lg p-8 bg-background rounded-2xl">
                <CardHeader>
                    <div className="mx-auto bg-primary rounded-full p-4 w-fit text-primary-foreground mb-4">
                        <Heart className="h-10 w-10" />
                    </div>
                    <CardTitle className="font-semibold text-3xl">Obrigado!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-lg">{state.message}</p>
                </CardContent>
            </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 md:py-24 bg-card">
      <div className="container max-w-lg">
        <div className="text-center mb-10">
            <h2 className="font-bold text-4xl md:text-5xl">Confirmar Presença</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Sua presença é o maior presente que podemos receber. Por favor, confirme sua participação até 1º de setembro de 2026 para que possamos planejar este momento especial com todo carinho.
            </p>
        </div>
        <Card className="shadow-lg bg-background rounded-2xl">
          <CardContent className="p-8">
            <form ref={formRef} action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" placeholder="Seu nome completo" required className="bg-background rounded-xl focus:border-primary" />
                {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
              </div>

               <div className="space-y-2">
                <Label htmlFor="guests">Número de Acompanhantes</Label>
                <Input id="guests" name="guests" type="number" min="0" defaultValue="0" className="bg-background rounded-xl focus:border-primary"/>
                {state.errors?.guests && <p className="text-sm font-medium text-destructive">{state.errors.guests[0]}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem Especial (Opcional)</Label>
                <Textarea id="message" name="message" placeholder="Deixe uma mensagem carinhosa para os noivos..." rows={3} className="bg-background rounded-xl focus:border-primary" />
                {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
              </div>
              
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
