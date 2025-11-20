'use server';
/**
 * @fileoverview Flow for generating travel suggestions for wedding guests.
 *
 * This file defines the AI flow for providing hotel and transportation
 * suggestions to wedding guests based on their budget, interests, and the
 * event's location and date.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TravelSuggestionsInputSchema = z.object({
  budget: z.enum(['low', 'medium', 'high']).describe('The guest\'s budget level.'),
  interests: z.string().optional().describe('The guest\'s preferences or interests (e.g., quiet, near restaurants).'),
  venue: z.string().describe('The address of the wedding venue.'),
  date: z.string().describe('The date of the wedding.'),
});
export type TravelSuggestionsInput = z.infer<typeof TravelSuggestionsInputSchema>;

const TravelSuggestionsOutputSchema = z.object({
  hotelSuggestions: z.string().describe('Up to three hotel or accommodation suggestions, including name, a brief description, and estimated price range. The suggestions should be tailored to the provided budget and interests.'),
  transportationSuggestions: z.string().describe('A few suggestions for transportation to the venue, considering the location and common options available in the area (e.g., ride-sharing, public transport, car rental).'),
});
export type TravelSuggestionsOutput = z.infer<typeof TravelSuggestionsOutputSchema>;

const travelSuggestionsPrompt = ai.definePrompt({
    name: 'travelSuggestionsPrompt',
    input: { schema: TravelSuggestionsInputSchema },
    output: { schema: TravelSuggestionsOutputSchema },
    prompt: `You are a helpful and friendly wedding travel assistant. Your goal is to provide useful and concise travel suggestions for guests attending a wedding.

The wedding is on {{date}} at {{venue}}.

The guest has the following preferences:
- Budget: {{budget}}
- Interests: {{interests}}

Based on this information, provide:
1.  **Hotel Suggestions:** Suggest 2-3 hotels or accommodations. For each, provide the name, a one-sentence description, and an estimated price range that matches their budget.
2.  **Transportation Ideas:** Suggest 1-2 practical ways for them to get to the venue on the wedding day.

Keep the tone warm, helpful, and celebratory. The output should be formatted as a JSON object with 'hotelSuggestions' and 'transportationSuggestions' keys.`,
});

const travelSuggestionsFlow = ai.defineFlow(
    {
        name: 'travelSuggestionsFlow',
        inputSchema: TravelSuggestionsInputSchema,
        outputSchema: TravelSuggestionsOutputSchema,
    },
    async (input) => {
        const { output } = await travelSuggestionsPrompt(input);
        return output!;
    }
);

export async function travelSuggestions(input: TravelSuggestionsInput): Promise<TravelSuggestionsOutput> {
    return travelSuggestionsFlow(input);
}
