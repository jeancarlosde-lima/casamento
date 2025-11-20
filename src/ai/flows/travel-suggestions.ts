'use server';
/**
 * @fileoverview Flow for generating travel suggestions for wedding guests.
 *
 * This file defines the AI flow for providing hotel and transportation
 * suggestions to wedding guests based on their budget and interests,
 * considering the fixed locations of the wedding ceremony and reception.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TravelSuggestionsInputSchema = z.object({
  budget: z.enum(['low', 'medium', 'high']).describe("The guest's budget level."),
  interests: z.string().optional().describe("The guest's preferences or interests (e.g., quiet, near restaurants)."),
});
export type TravelSuggestionsInput = z.infer<typeof TravelSuggestionsInputSchema>;

const TravelSuggestionsOutputSchema = z.object({
  hotelSuggestions: z.string().describe('Up to three hotel or accommodation suggestions, including name, a brief description, estimated price range, and a direct booking link (e.g., from Booking.com or similar). The suggestions should be tailored to the provided budget and interests.'),
  transportationSuggestions: z.string().describe('A few suggestions for transportation between the ceremony and reception, and to the venues, considering the locations and common options available (e.g., ride-sharing, car rental).'),
});
export type TravelSuggestionsOutput = z.infer<typeof TravelSuggestionsOutputSchema>;

const travelSuggestionsPrompt = ai.definePrompt({
    name: 'travelSuggestionsPrompt',
    input: { schema: TravelSuggestionsInputSchema },
    output: { schema: TravelSuggestionsOutputSchema },
    prompt: `You are a helpful and friendly wedding travel assistant. Your goal is to provide useful and concise travel suggestions for guests attending a wedding.

The wedding has two locations:
1. Ceremony: Paróquia Santos Apóstolos - R. Capela do Alto, 86 - Vila Virginia, Itaquaquecetuba - SP, 08576-150
2. Reception: Sítio Recanto das Palmeiras - Estr. do Oura, 420 - Ipelândia, Suzano - SP, 08620-060
The date is October 10, 2026.

The guest has the following preferences:
- Budget: {{budget}}
- Interests: {{interests}}

Based on this information, provide:
1.  **Hotel Suggestions:** Suggest 2-3 hotels or accommodations that are conveniently located for both venues. For each, provide the name, a one-sentence description, an estimated price range that matches their budget, and a direct booking link (e.g., from Booking.com, Google Travel, etc.). Format the output as plain text.
2.  **Transportation Ideas:** Suggest 1-2 practical ways for them to get between the ceremony and the reception, and to the venues on the wedding day.

Keep the tone warm, helpful, and celebratory. Structure the response as a clear text output.`,
});

const travelSuggestionsFlow = ai.defineFlow(
    {
        name: 'travelSuggestionsFlow',
        inputSchema: TravelSuggestionsInputSchema,
        outputSchema: TravelSuggestionsOutputSchema,
    },
    async (input) => {
        const { output } = await travelSuggestionsPrompt(input);
        
        if (!output) {
            throw new Error("AI failed to generate suggestions.");
        }

        return output;
    }
);

export async function travelSuggestions(input: TravelSuggestionsInput): Promise<TravelSuggestionsOutput> {
    return travelSuggestionsFlow(input);
}
