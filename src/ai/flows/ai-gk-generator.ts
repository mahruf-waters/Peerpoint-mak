'use server';
/**
 * @fileOverview An AI flow that generates category-specific General Knowledge questions.
 * Includes retry logic to handle API rate limits (Quota Exhaustion).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GKQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string(),
  explanation: z.string(),
  category: z.string(),
});

const GKGeneratorInputSchema = z.object({
  category: z.string().describe('The GK category to generate questions for.'),
  count: z.number().optional().default(5).describe('Number of questions to generate.'),
});

const GKGeneratorOutputSchema = z.object({
  questions: z.array(GKQuestionSchema),
});

export type GKQuestion = z.infer<typeof GKQuestionSchema>;
export type GKGeneratorOutput = z.infer<typeof GKGeneratorOutputSchema>;

/**
 * Retries an async function with exponential backoff.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      // If it's a 429 error, wait and retry
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        continue;
      }
      throw err; // For other errors, throw immediately
    }
  }
  throw lastError;
}

export async function generateGKQuestions(category: string, count: number = 5): Promise<GKGeneratorOutput> {
  return withRetry(() => gkGeneratorFlow({ category, count }));
}

const gkGeneratorFlow = ai.defineFlow(
  {
    name: 'gkGeneratorFlow',
    inputSchema: GKGeneratorInputSchema,
    outputSchema: GKGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an expert academic tutor for Ugandan Mature Age Entry Exams. 
      Generate ${input.count} high-quality, multiple-choice questions for the category: "${input.category}".
      
      Ensure the questions are challenging and relevant to the specific topic.
      - Current Affairs: Focus on recent global and local news (2023-2024).
      - Uganda Knowledge: History, geography, and governance of Uganda.
      - Logical Reasoning: Aptitude, puzzles, and verbal reasoning.
      - English & Vocabulary: Synonyms, antonyms, and grammar.
      - Science & Technology: Modern innovations and basic scientific principles.
      
      Provide a detailed explanation for each correct answer.`,
      output: { schema: GKGeneratorOutputSchema },
    });

    if (!output) {
      throw new Error('Failed to generate GK questions.');
    }

    return output;
  }
);
