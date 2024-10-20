import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    })
    .regex(/^\S*$/, { message: 'Password cannot contain spaces.' }),
});

export const newUserFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/^\S*$/, 'Password cannot contain spaces.'),
});

export const verificationSchema = z.object({
  pin: z.string().length(6, {
    message: 'Verification code must be 6 characters long.',
  }),
});

export const pollFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long.'),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(
      (data) => data.from <= data.to,
      'End date must be after start date.'
    ),
});

export const guestFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
});
