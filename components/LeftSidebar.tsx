'use client';

import { LogIn, LogOut, UserRoundPlus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sidebar } from './ui/sidebar';
import { NavMain } from './navigation';
import { NAVIGATION_LINKS } from '@/lib/constants';

export function LeftSidebar() {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <Sidebar side='left' className='justify-between'>
      <NavMain items={NAVIGATION_LINKS} />
      {isAuthenticated ? (
        <Button
          className='w-full justify-start'
          variant='ghost'
          size='lg'
          onClick={() => signOut()}
        >
          <LogOut /> Log Out
        </Button>
      ) : (
        <div className='flex w-full flex-col gap-2'>
          <Button variant='outline' asChild>
            <Link href='/sign-in'>
              <LogIn /> Log In
            </Link>
          </Button>
          <Button asChild>
            <Link href='/sign-up'>
              <UserRoundPlus /> Sign Up
            </Link>
          </Button>
        </div>
      )}
    </Sidebar>
  );
}
