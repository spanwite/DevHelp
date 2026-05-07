import z from 'zod/v3';

export const questionSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(100, 'Title cannot be more than 100 characters.'),

  description: z
    .string()
    .min(1, 'Description is required.')
    .max(5000, 'Description cannot be more than 5000 characters.'),

  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag cannot be empty.')
        .max(30, 'Tag cannot be more than 30 characters.')
    )
    .min(1, 'At least one tag is required.')
    .max(5, 'You can add up to 5 tags.'),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
