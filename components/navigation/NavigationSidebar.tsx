'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { NavigationList } from './NavigationList';
import { signOut, useSession } from 'next-auth/react';
import { LogIn, LogOut, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';

export function NavigationSidebar({
  className,
  side = 'left',
  ...props
}: React.ComponentProps<'aside'> & { side?: 'left' | 'right' }) {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <aside
      className={cn(
        'border-input bg-background sticky top-(--header-height) flex max-h-[calc(100vh-var(--header-height))] max-w-3xs flex-col justify-between gap-4 overflow-y-auto p-4 max-sm:hidden',
        side === 'right' && 'right-0 border-l',
        side === 'left' && 'left-0 border-r',
        className
      )}
      {...props}
    >
      <nav className='w-full'>
        <NavigationList />
      </nav>
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
    </aside>
  );
}
