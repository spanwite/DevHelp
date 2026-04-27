'use client';

import { AuthCard } from '@/components/auth';
import { signUpSchema } from '@/lib/schemas';

export default function SignUp() {
  return (
    <AuthCard
      schema={signUpSchema}
      defaultValues={{ email: '', name: '', username: '', password: '' }}
    />
  );
}
