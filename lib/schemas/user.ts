import z from 'zod/v3';

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(100, 'Name cannot be more than 100 characters.')
    .optional(),

  username: z
    .string()
    .min(3, 'Username must must be at least 3 characters')
    .max(30, 'Username cannot be more than 30 characters.'),

  email: z.string().email('Invalid email address.'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(100, 'Password cannot be more than 100 characters.'),

  avatar: z.string().url('Avatar must be a valid URL.').optional(),

  location: z
    .string()
    .max(100, 'Location cannot be more than 100 characters.')
    .optional(),

  website: z.string().url('Website must be a valid URL.').optional(),

  bio: z
    .string()
    .max(500, 'Bio cannot be more than 500 characters.')
    .optional(),

  reputation: z.number().optional(),
});
