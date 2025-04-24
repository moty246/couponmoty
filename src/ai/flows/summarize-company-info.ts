'use server';
/**
 * @fileOverview Summarizes company information based on the company name.
 *
 * - summarizeCompanyInfo - A function that summarizes company information.
 * - SummarizeCompanyInfoInput - The input type for the summarizeCompanyInfo function.
 * - SummarizeCompanyInfoOutput - The return type for the summarizeCompanyInfo function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import { getCompanyInfo } from '@/services/company-info';

const SummarizeCompanyInfoInputSchema = z.object({
  companyName: z.string().describe('The name of the company to summarize information for.'),
});
export type SummarizeCompanyInfoInput = z.infer<typeof SummarizeCompanyInfoInputSchema>;

const SummarizeCompanyInfoOutputSchema = z.object({
  summary: z.string().describe('A short summary of the company information.'),
});
export type SummarizeCompanyInfoOutput = z.infer<typeof SummarizeCompanyInfoOutputSchema>;

export async function summarizeCompanyInfo(input: SummarizeCompanyInfoInput): Promise<SummarizeCompanyInfoOutput> {
  return summarizeCompanyInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCompanyInfoPrompt',
  input: {
    schema: z.object({
      companyName: z.string().describe('The name of the company to summarize information for.'),
      website: z.string().describe('The website of the company.'),
      description: z.string().describe('A short description of the company.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A short summary of the company information.'),
    }),
  },
  prompt: `Summarize the following company information in a concise manner.
Company Name: {{{companyName}}}
Website: {{{website}}}
Description: {{{description}}}`,
});

const summarizeCompanyInfoFlow = ai.defineFlow<
  typeof SummarizeCompanyInfoInputSchema,
  typeof SummarizeCompanyInfoOutputSchema
>({
  name: 'summarizeCompanyInfoFlow',
  inputSchema: SummarizeCompanyInfoInputSchema,
  outputSchema: SummarizeCompanyInfoOutputSchema,
}, async (input) => {
  const companyInfo = await getCompanyInfo(input.companyName);
  const { output } = await prompt({...input, ...companyInfo});
  return output!;
});
