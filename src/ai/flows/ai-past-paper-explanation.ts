'use server';
/**
 * @fileOverview An AI assistant that provides detailed step-by-step explanations for complex past paper answers.
 *
 * - aiPastPaperExplanation - A function that handles the generation of detailed explanations.
 * - AiPastPaperExplanationInput - The input type for the aiPastPaperExplanation function.
 * - AiPastPaperExplanationOutput - The return type for the aiPastPaperExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPastPaperExplanationInputSchema = z.object({
  question: z.string().describe('The past paper question that needs explanation.'),
  complexAnswer: z
    .string()
    .describe('The complex answer to the past paper question.'),
});
export type AiPastPaperExplanationInput = z.infer<
  typeof AiPastPaperExplanationInputSchema
>;

const AiPastPaperExplanationOutputSchema = z.object({
  detailedExplanation: z
    .string()
    .describe(
      'A detailed, step-by-step explanation of the complex answer, breaking down concepts and reasoning.'
    ),
});
export type AiPastPaperExplanationOutput = z.infer<
  typeof AiPastPaperExplanationOutputSchema
>;

export async function aiPastPaperExplanation(
  input: AiPastPaperExplanationInput
): Promise<AiPastPaperExplanationOutput> {
  return aiPastPaperExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPastPaperExplanationPrompt',
  input: {schema: AiPastPaperExplanationInputSchema},
  output: {schema: AiPastPaperExplanationOutputSchema},
  prompt: `You are an expert tutor specializing in explaining complex academic concepts clearly and concisely, especially for students preparing for mature age entry exams.

Your task is to provide a detailed, step-by-step explanation for a given complex past paper answer, building on the provided question. Break down the concepts and reasoning so that a student can fully understand the solution without needing further assistance. Focus on clarity and a logical flow of information.

Question: {{{question}}}

Complex Answer: {{{complexAnswer}}}

Provide the explanation in the 'detailedExplanation' field.`,
});

const aiPastPaperExplanationFlow = ai.defineFlow(
  {
    name: 'aiPastPaperExplanationFlow',
    inputSchema: AiPastPaperExplanationInputSchema,
    outputSchema: AiPastPaperExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
