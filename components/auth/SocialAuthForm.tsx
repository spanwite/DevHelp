'use client';

import { Button } from '../ui/button';
import { ROUTES } from '@/lib/constants';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';

export function SocialAuthForm() {
  const onAuth = async (provider: 'github' | 'google') => {
    try {
      await signIn(provider, {
        redirect: true,
        redirectTo: ROUTES.home,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error during ${provider} authentication:';
      toast.error('Sign-in failed. Please try again.', {
        description: message,
      });
    }
  };

  return (
    <div
      className='flex flex-wrap gap-2.5 justify-center'
    >
      <Button variant='outline' type='submit' onClick={() => onAuth('github')}>
        <Image src='/github.svg' alt='Github Logomark' width={20} height={20} />
        Login with GitHub
      </Button>
      <Button variant='outline' type='submit' onClick={() => onAuth('google')}>
        <Image
          src='/google.svg'
          alt='Google Logomark'
          className='text-foreground'
          width={20}
          height={20}
          color='#ffffff'
        />
        Login with Google
      </Button>
    </div>
  );
}
