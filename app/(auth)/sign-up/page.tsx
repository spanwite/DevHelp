'use client';

import { Auth } from '@/components/auth';
import { signUpSchema } from '@/lib/schemas';

export default function SignUp() {
  return (
    <Auth
      schema={signUpSchema}
      defaultValues={{ email: '', name: '', username: '', password: '' }}
    />
  );
}
