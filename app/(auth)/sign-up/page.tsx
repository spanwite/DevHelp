'use client';

import { Auth } from '@/components/auth';
import { signUpWithCredentials } from '@/lib/actions/auth';
import { signUpSchema } from '@/lib/schemas/auth';

export default function SignUp() {
  return (
    <Auth
      schema={signUpSchema}
      defaultValues={{ email: '', name: '', username: '', password: '' }}
      onAuth={signUpWithCredentials}
    />
  );
}
