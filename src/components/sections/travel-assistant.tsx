'use client';

import { useState } from 'react';
import { travelSuggestions } from '@/ai/flows/travel-suggestions';
import type { TravelSuggestionsOutput } from '@/ai/flows/travel-suggestions';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BedDouble, Loader2, Plane, Wand2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';


const formSchema = z.object({
  budget: z.enum(['low', 'medium', 'high']),
  interests: z.string().max(200, 'Please keep your interests under 200 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function TravelAssistantSection() {
  const [suggestions, setSuggestions] = useState<TravelSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { budget: 'medium', interests: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    setError(null);
    try {
      const result = await travelSuggestions({
        ...data,
        venue: 'Sítio Recanto das Palmeiras, Estr. do Oura, 420 - Ipelândia, Suzano - SP, 08620-060',
        date: '10 de Outubro de 2026',
      });
      setSuggestions(result);
    } catch (err) {
      setError('Desculpe, tivemos um problema ao buscar as sugestões. Por favor, tente novamente.');
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
      <div className="container max-w-4xl">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl">Assistente de Viagem</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Vindo de longe para o nosso casamento? Deixe nosso assistente de IA te ajudar com algumas sugestões.
          </p>
        </div>
        <Card className="shadow-lg bg-card rounded-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="budget">Qual é o seu orçamento?</Label>
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="budget" className="w-full bg-background">
                          <SelectValue placeholder="Selecione o orçamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Econômico</SelectItem>
                          <SelectItem value="medium">Confortável</SelectItem>
                          <SelectItem value="high">Luxo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.budget && <p className="text-sm font-medium text-destructive">{errors.budget.message}</p>}
                </div>
                <div>
                  <Label htmlFor="interests">Alguma preferência?</Label>
                  <Textarea
                    id="interests"
                    {...register('interests')}
                    placeholder="Ex: bairro tranquilo, perto de restaurantes, aceita pets..."
                    className="h-24 bg-background"
                  />
                  {errors.interests && <p className="text-sm font-medium text-destructive">{errors.interests.message}</p>}
                </div>
                <Button type="submit" disabled={isLoading} size="lg" className="w-full rounded-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                  )}
                  Obter Sugestões
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl text-foreground">Nossas Sugestões</h3>
                {isLoading && (
                   <div className="space-y-4">
                      <Card className="bg-background/50"><CardContent className="p-4 space-y-2"><Skeleton className="h-5 w-1/3" /><Skeleton className="h-4 w-full mt-2" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
                      <Card className="bg-background/50"><CardContent className="p-4 space-y-2"><Skeleton className="h-5 w-1/3" /><Skeleton className="h-4 w-full mt-2" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
                   </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {suggestions && (
                  <div className="space-y-4 animate-fade-in">
                    <Card className="bg-background/50">
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                          <BedDouble className="h-6 w-6 text-primary"/>
                          <CardTitle className="font-poppins text-lg font-semibold">Sugestões de Hotel</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions.hotelSuggestions}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-background/50">
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                          <Plane className="h-6 w-6 text-primary"/>
                          <CardTitle className="font-poppins text-lg font-semibold">Ideias de Transporte</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions.transportationSuggestions}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                 {!isLoading && !suggestions && !error && (
                    <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg bg-background/30">
                        <p>Suas dicas de viagem personalizadas aparecerão aqui.</p>
                    </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
