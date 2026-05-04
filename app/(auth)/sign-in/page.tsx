'use client';

import { Auth } from '@/components/auth';
import { signInSchema } from '@/lib/schemas/auth';

export default function SignIn() {
  return (
    <Auth schema={signInSchema} defaultValues={{ email: '', password: '' }} />
  );
}
