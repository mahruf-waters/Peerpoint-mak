'use server';
/**
 * @fileOverview An AI flow that generates a live-feeling news and events feed.
 * Includes retry logic to handle API rate limits.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsFeedOutputSchema = z.object({
  news: z.array(z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    time: z.string(),
    source: z.string(),
    summary: z.string(),
    image: z.string(),
  })),
  events: z.array(z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    status: z.string(),
    location: z.string(),
    type: z.string(),
  })),
});

export type NewsFeedOutput = z.infer<typeof NewsFeedOutputSchema>;

/**
 * Retries an async function with exponential backoff.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 5, delay = 2000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const errorMessage = err.message || String(err);
      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
        const waitTime = delay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export async function getLiveNewsFeed(): Promise<NewsFeedOutput> {
  return withRetry(() => aiLiveNewsFeedFlow({}));
}

const aiLiveNewsFeedFlow = ai.defineFlow(
  {
    name: 'aiLiveNewsFeedFlow',
    inputSchema: z.object({}),
    outputSchema: NewsFeedOutputSchema,
  },
  async () => {
    const today = new Date();
    const { output } = await ai.generate({
      prompt: `You are a specialized news and academic event aggregator for Ugandan students. 
      Generate a list of 4 highly relevant, current (dated for ${today.getFullYear()}) news headlines and 4 upcoming academic/public events.
      
      Focus categories:
      1. Global education and higher learning trends.
      2. Specific news from Makerere, MUBS, Kyambogo, and MUST.
      3. East African Community (EAC) regional integration and education news.
      4. Significant global tech or science events relevant to aptitude tests.
      
      Current Date Context: ${today.toDateString()}.
      
      For news images, use: https://picsum.photos/seed/[random_number]/400/250.
      Ensure the events range from 'Recent' (last few weeks) to 'Upcoming' (next 3 months).`,
      output: { schema: NewsFeedOutputSchema },
    });

    if (!output) {
      throw new Error('Failed to generate news feed.');
    }

    return output;
  }
);
