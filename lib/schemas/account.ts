import z from 'zod/v3';

export const AccountSchema = z.object({
  userId: z.string(),
  username: z
    .string()
    .min(3, 'Username must must be at least 3 characters long.')
    .max(30, 'Username cannot be more than 30 characters long.'),
  avatar: z.string().url().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(100, 'Password cannot be more than 100 characters.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[!@#$%^&*(),.?":{}|<>_]/,
      'Password must contain at least one special character.'
    )
    .optional(),
  provider: z.enum(['google', 'github']),
  providerAccountId: z.string().min(1, 'Provider account ID is required.'),
});

export type Account = z.infer<typeof AccountSchema>;
