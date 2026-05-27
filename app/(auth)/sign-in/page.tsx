'use client';

import { Auth } from '@/components/auth';
import { signInSchema } from '@/lib/schemas/auth';
import { signInWithCredentials } from '@/lib/actions/auth';

export default function SignIn() {
  return (
    <Auth
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
      onAuth={(data) => signInWithCredentials(data)}
    />
  );
}
