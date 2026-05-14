'use server';
/**
 * @fileOverview An AI agent that analyzes quiz performance and provides personalized study recommendations.
 *
 * - aiPersonalizedStudyRecommendations - A function that handles the study recommendation process.
 * - AiPersonalizedStudyRecommendationsInput - The input type for the aiPersonalizedStudyRecommendations function.
 * - AiPersonalizedStudyRecommendationsOutput - The return type for the aiPersonalizedStudyRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AiPersonalizedStudyRecommendationsInputSchema = z.object({
  quizResults: z.array(z.object({
    questionId: z.string().describe('Unique identifier for the quiz question.'),
    subject: z.string().describe('The academic subject of the question (e.g., "Mathematics", "English", "Aptitude").'),
    topic: z.string().describe('The specific topic within the subject (e.g., "Algebra", "Grammar", "Logical Reasoning").'),
    isCorrect: z.boolean().describe('True if the user answered the question correctly, false otherwise.'),
    userAnswer: z.string().optional().describe('The answer provided by the user.'),
    correctAnswer: z.string().optional().describe('The correct answer to the question.'),
  })).describe('An array of quiz question results for analysis.'),
  targetUniversity: z.string().optional().describe('The university the student is targeting (e.g., "Makerere University").'),
  targetCourse: z.string().optional().describe('The course the student is interested in (e.g., "Bachelor of Medicine and Surgery").'),
});
export type AiPersonalizedStudyRecommendationsInput = z.infer<typeof AiPersonalizedStudyRecommendationsInputSchema>;

// Output Schema
const AiPersonalizedStudyRecommendationsOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the student\u0027s performance, highlighting strengths and weaknesses.'),
  weakAreas: z.array(z.string()).describe('A list of specific subjects or topics where the student showed weakness.'),
  recommendedTopics: z.array(z.string()).describe('A list of specific topics for the student to revise.'),
  recommendedPastPapers: z.array(z.object({
    university: z.string().describe('The university the past paper is from.'),
    year: z.string().describe('The year of the past paper.'),
    subject: z.string().describe('The subject of the past paper.'),
    questionDescription: z.string().describe('A description of the type of question to focus on, or specific question numbers if available.'),
  })).describe('A list of recommended past papers or specific questions to practice.'),
});
export type AiPersonalizedStudyRecommendationsOutput = z.infer<typeof AiPersonalizedStudyRecommendationsOutputSchema>;

// Wrapper function
export async function aiPersonalizedStudyRecommendations(input: AiPersonalizedStudyRecommendationsInput): Promise<AiPersonalizedStudyRecommendationsOutput> {
  return aiPersonalizedStudyRecommendationsFlow(input);
}

// Prompt definition
const aiPersonalizedStudyRecommendationsPrompt = ai.definePrompt({
  name: 'aiPersonalizedStudyRecommendationsPrompt',
  input: { schema: AiPersonalizedStudyRecommendationsInputSchema },
  output: { schema: AiPersonalizedStudyRecommendationsOutputSchema },
  prompt: `You are an expert academic tutor specializing in Mature Age Entry Exams for Ugandan universities.\nYour goal is to analyze a student's quiz performance, identify their weak areas, and provide actionable recommendations for improvement, including specific topics to revise and past paper questions to practice.\n\nHere are the student's quiz results:\n{{{JSON.stringify quizResults}}}\n\n{{#if targetUniversity}}\nThe student is targeting: {{{targetUniversity}}}\n{{/if}}\n\n{{#if targetCourse}}\nTheir target course is: {{{targetCourse}}}\n{{/if}}\n\nAnalyze the provided quiz results.\n1.  Identify specific subjects and topics where the student answered incorrectly or showed a pattern of weakness.\n2.  Provide a concise 'analysisSummary' of their overall performance, highlighting both strengths and weaknesses.\n3.  List the 'weakAreas' as an array of strings, focusing on key subjects or topics.\n4.  Suggest 'recommendedTopics' for revision as an array of strings. These should be very specific (e.g., "Quadratic Equations", "Sentence Structure").\n5.  Recommend 'recommendedPastPapers' as an array of objects. For each recommendation, specify the 'university', 'year', 'subject', and a 'questionDescription' that guides the student to focus on specific types of questions or even specific question numbers related to their weak areas. If specific question numbers aren't available, describe the type of question to practice.\n\nEnsure the output strictly adheres to the JSON schema provided.\n`,
});

// Flow definition
const aiPersonalizedStudyRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPersonalizedStudyRecommendationsFlow',
    inputSchema: AiPersonalizedStudyRecommendationsInputSchema,
    outputSchema: AiPersonalizedStudyRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await aiPersonalizedStudyRecommendationsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate study recommendations.');
    }
    return output;
  }
);
