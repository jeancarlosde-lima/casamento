'use client';

import { useState } from 'react';
import { travelSuggestions } from '@/ai/flows/travel-suggestions';
import type { TravelSuggestionsOutput } from '@/ai/flows/travel-suggestions';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    setValue,
    trigger,
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
        venue: 'The Grand Palace, 123 Celebration Ave, Happytown',
        date: 'November 16, 2024',
      });
      setSuggestions(result);
    } catch (err) {
      setError('Sorry, we had trouble getting suggestions. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <section id="travel-assistant" className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Travel Assistant</h2>
          <p className="mt-4 text-muted-foreground">
            Traveling for our wedding? Let our AI assistant help you with some suggestions.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">What's your budget?</Label>
                  <Select
                    defaultValue="medium"
                    onValueChange={(value: 'low' | 'medium' | 'high') => {
                      setValue('budget', value);
                      trigger('budget');
                    }}
                  >
                    <SelectTrigger id="budget" className="w-full">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Budget-friendly</SelectItem>
                      <SelectItem value="medium">Comfortable</SelectItem>
                      <SelectItem value="high">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-sm font-medium text-destructive">{errors.budget.message}</p>}
                </div>
                <div>
                  <Label htmlFor="interests">Any preferences?</Label>
                  <Textarea
                    id="interests"
                    {...register('interests')}
                    placeholder="e.g., quiet neighborhood, close to restaurants, pet-friendly..."
                    className="h-24"
                  />
                  {errors.interests && <p className="text-sm font-medium text-destructive">{errors.interests.message}</p>}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Get Suggestions
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-xl">Our Suggestions</h3>
                {isLoading && (
                   <div className="space-y-4">
                      <Card><CardContent className="p-4 space-y-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
                      <Card><CardContent className="p-4 space-y-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
                   </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {suggestions && (
                  <div className="space-y-4 animate-fade-in">
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                          <BedDouble className="h-6 w-6 text-primary"/>
                          <CardTitle className="font-body text-lg">Hotel Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions.hotelSuggestions}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                          <Plane className="h-6 w-6 text-primary"/>
                          <CardTitle className="font-body text-lg">Transportation Ideas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions.transportationSuggestions}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                 {!isLoading && !suggestions && !error && (
                    <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                        <p>Your personalized travel tips will appear here.</p>
                    </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
