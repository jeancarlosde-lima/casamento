// src/ai/flows/travel-suggestions.ts
'use server';
/**
 * @fileOverview A travel suggestion AI agent.
 *
 * - travelSuggestions - A function that handles the travel suggestion process.
 * - TravelSuggestionsInput - The input type for the travelSuggestions function.
 * - TravelSuggestionsOutput - The return type for the travelSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelSuggestionsInputSchema = z.object({
  venue: z.string().describe('The wedding venue.'),
  date: z.string().describe('The wedding date.'),
  budget: z.string().describe('The budget for travel and lodging (e.g., "low", "medium", "high").'),
  interests: z.string().describe('Interests or preferences for travel and lodging.'),
});
export type TravelSuggestionsInput = z.infer<typeof TravelSuggestionsInputSchema>;

const TravelSuggestionsOutputSchema = z.object({
  hotelSuggestions: z.string().describe('Suggestions for nearby hotels.'),
  transportationSuggestions: z.string().describe('Suggestions for transportation options to and from the venue.'),
});
export type TravelSuggestionsOutput = z.infer<typeof TravelSuggestionsOutputSchema>;

export async function travelSuggestions(input: TravelSuggestionsInput): Promise<TravelSuggestionsOutput> {
  return travelSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'travelSuggestionsPrompt',
  input: {schema: TravelSuggestionsInputSchema},
  output: {schema: TravelSuggestionsOutputSchema},
  prompt: `You are a travel assistant specializing in providing travel and lodging suggestions for wedding guests.

You will use the following information to provide personalized suggestions for nearby hotels and transportation options.

Wedding Venue: {{{venue}}}
Wedding Date: {{{date}}}
Budget: {{{budget}}}
Interests/Preferences: {{{interests}}}

Provide detailed suggestions, considering the provided budget and interests.
`, 
});

const travelSuggestionsFlow = ai.defineFlow(
  {
    name: 'travelSuggestionsFlow',
    inputSchema: TravelSuggestionsInputSchema,
    outputSchema: TravelSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
