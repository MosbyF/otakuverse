// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates recommendations for anime and manga based on a given title.
 *
 * - animeMangaRecommendations - A function that provides anime/manga recommendations.
 * - AnimeMangaRecommendationsInput - The input type for the animeMangaRecommendations function.
 * - AnimeMangaRecommendationsOutput - The return type for the animeMangaRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimeMangaRecommendationsInputSchema = z.object({
  title: z.string().describe('The title of the anime or manga to base recommendations on.'),
  genre: z.string().describe('The genre of the anime or manga.'),
  description: z.string().describe('A brief description of the anime or manga.'),
});
export type AnimeMangaRecommendationsInput = z.infer<typeof AnimeMangaRecommendationsInputSchema>;

const AnimeMangaRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        title: z.string().describe('The title of the recommended anime or manga.'),
        reason: z.string().describe('The reason why this title is recommended.'),
      })
    )
    .describe('A list of recommended anime or manga titles.'),
});
export type AnimeMangaRecommendationsOutput = z.infer<
  typeof AnimeMangaRecommendationsOutputSchema
>;

export async function animeMangaRecommendations(
  input: AnimeMangaRecommendationsInput
): Promise<AnimeMangaRecommendationsOutput> {
  return animeMangaRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animeMangaRecommendationsPrompt',
  input: {schema: AnimeMangaRecommendationsInputSchema},
  output: {schema: AnimeMangaRecommendationsOutputSchema},
  prompt: `You are an anime and manga recommendation expert. Given the details of an anime or manga title, you will provide a list of other titles that the user might enjoy.

  Title: {{{title}}}
  Genre: {{{genre}}}
  Description: {{{description}}}

  Provide recommendations based on similar themes, genres, or characters. Explain why each title is recommended.

  Format your output as a JSON array of objects, where each object has a "title" and a "reason" field.
  `,
});

const animeMangaRecommendationsFlow = ai.defineFlow(
  {
    name: 'animeMangaRecommendationsFlow',
    inputSchema: AnimeMangaRecommendationsInputSchema,
    outputSchema: AnimeMangaRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
