// src/ai/flows/sentiment-analysis-fandom-posts.ts
'use server';

/**
 * @fileOverview Analyzes the sentiment of user posts in fandom discussions.
 *
 * - analyzeSentiment - A function that takes a user post as input and returns its sentiment.
 * - SentimentAnalysisInput - The input type for the analyzeSentiment function.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentAnalysisInputSchema = z.object({
  text: z.string().describe('The text content of the user post.'),
});
export type SentimentAnalysisInput = z.infer<typeof SentimentAnalysisInputSchema>;

const SentimentAnalysisOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the text.'),
  score: z.number().describe('A numerical score indicating the strength of the sentiment.'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeSentiment(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
  return sentimentAnalysisFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentAnalysisInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `Analyze the sentiment of the following text:

Text: {{{text}}}

Determine whether the sentiment is positive, negative, or neutral. Also, provide a numerical score between -1 and 1 indicating the strength of the sentiment, where -1 is very negative and 1 is very positive. Return the result as a JSON object with "sentiment" and "score" fields.

Your response should be ONLY a valid JSON document.  Do not include any other text.`,
});

const sentimentAnalysisFlow = ai.defineFlow(
  {
    name: 'sentimentAnalysisFlow',
    inputSchema: SentimentAnalysisInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);
