'use client';

import { Auth } from '@/components/auth';
import { signInSchema } from '@/lib/schemas';

export default function SignUp() {
  return (
    <Auth schema={signInSchema} defaultValues={{ email: '', password: '' }} />
  );
}
