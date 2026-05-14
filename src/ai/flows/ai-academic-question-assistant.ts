'use server';
/**
 * @fileOverview An AI assistant that answers academic questions for students.
 *
 * - academicQuestionAssistant - A function that handles academic questions.
 * - AcademicQuestionAssistantInput - The input type for the academicQuestionAssistant function.
 * - AcademicQuestionAssistantOutput - The return type for the academicQuestionAssistant function.
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

export async function academicQuestionAssistant(
  input: AcademicQuestionAssistantInput
): Promise<AcademicQuestionAssistantOutput> {
  return academicQuestionAssistantFlow(input);
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
