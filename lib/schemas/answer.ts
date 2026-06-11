import { z } from 'zod/v3';

export const answerSchema = z.object({
  content: z.string().min(100, 'Answer must be at least 100 characters.'),
});

export type AnswerFormData = z.infer<typeof answerSchema>;
