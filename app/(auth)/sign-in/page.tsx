'use client';

import { AuthCard } from '@/components/auth';
import { signInSchema } from '@/lib/schemas';

export default function SignUp() {
  return (
    <AuthCard
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
    />
  );
}
