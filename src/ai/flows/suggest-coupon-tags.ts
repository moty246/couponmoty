// 'use server'
'use server';

/**
 * @fileOverview Suggests relevant tags and categories for a coupon based on the company name and coupon code.
 *
 * - suggestCouponTags - A function that suggests tags and categories for a coupon.
 * - SuggestCouponTagsInput - The input type for the suggestCouponTags function.
 * - SuggestCouponTagsOutput - The return type for the suggestCouponTags function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const SuggestCouponTagsInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  couponCode: z.string().describe('The coupon code.'),
});
export type SuggestCouponTagsInput = z.infer<typeof SuggestCouponTagsInputSchema>;

const SuggestCouponTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('Suggested tags for the coupon.'),
  category: z.string().describe('Suggested category for the coupon.'),
});
export type SuggestCouponTagsOutput = z.infer<typeof SuggestCouponTagsOutputSchema>;

export async function suggestCouponTags(input: SuggestCouponTagsInput): Promise<SuggestCouponTagsOutput> {
  return suggestCouponTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCouponTagsPrompt',
  input: {
    schema: z.object({
      companyName: z.string().describe('The name of the company.'),
      couponCode: z.string().describe('The coupon code.'),
    }),
  },
  output: {
    schema: z.object({
      tags: z.array(z.string()).describe('Suggested tags for the coupon.'),
      category: z.string().describe('Suggested category for the coupon.'),
    }),
  },
  prompt: `Suggest relevant tags and a category for a coupon based on the company name and coupon code.

Company Name: {{{companyName}}}
Coupon Code: {{{couponCode}}}

Suggest at least 3 tags.
`,
});

const suggestCouponTagsFlow = ai.defineFlow<
  typeof SuggestCouponTagsInputSchema,
  typeof SuggestCouponTagsOutputSchema
>({
  name: 'suggestCouponTagsFlow',
  inputSchema: SuggestCouponTagsInputSchema,
  outputSchema: SuggestCouponTagsOutputSchema,
}, async (input) => {
  const { output } = await prompt(input);
  return output!;
});
