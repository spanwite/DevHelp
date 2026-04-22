'use client';

import { SessionProvider } from 'next-auth/react';
import { ComponentProps } from 'react';

export function AuthProvider(props: ComponentProps<typeof SessionProvider>) {
  return <SessionProvider {...props} />;
}
