'use server';
/**
 * @fileOverview An AI assistant that answers academic questions for students.
 * Includes retry logic for API rate limits.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicQuestionAssistantInputSchema = z
  .object({
    question: z
      .string()
      .describe("The academic question the student needs help with."),
  })
  .describe('Input for the academic question assistant.');
export type AcademicQuestionAssistantInput = z.infer<
  typeof AcademicQuestionAssistantInputSchema
>;

const AcademicQuestionAssistantOutputSchema = z
  .object({
    answer: z
      .string()
      .describe("A comprehensive and accurate answer to the academic question."),
  })
  .describe('Output from the academic question assistant.');
export type AcademicQuestionAssistantOutput = z.infer<
  typeof AcademicQuestionAssistantOutputSchema
>;

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

export async function academicQuestionAssistant(
  input: AcademicQuestionAssistantInput
): Promise<AcademicQuestionAssistantOutput> {
  return withRetry(() => academicQuestionAssistantFlow(input));
}

const academicQuestionAssistantPrompt = ai.definePrompt({
  name: 'academicQuestionAssistantPrompt',
  input: {schema: AcademicQuestionAssistantInputSchema},
  output: {schema: AcademicQuestionAssistantOutputSchema},
  prompt: `You are a highly knowledgeable academic assistant for students preparing for mature-age entry exams in Ugandan universities like Makerere University, Kyambogo University, MUBS, and MUST. Your role is to provide comprehensive, accurate, and easy-to-understand answers to academic questions about exam topics or concepts. Clarify any doubts and deepen the student's understanding.

Student's Question: {{{question}}}`,
});

const academicQuestionAssistantFlow = ai.defineFlow(
  {
    name: 'academicQuestionAssistantFlow',
    inputSchema: AcademicQuestionAssistantInputSchema,
    outputSchema: AcademicQuestionAssistantOutputSchema,
  },
  async input => {
    const {output} = await academicQuestionAssistantPrompt(input);
    return output!;
  }
);
