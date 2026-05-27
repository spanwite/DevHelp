'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { MainNav } from '../navigation';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { signOut, useSession } from 'next-auth/react';

export function NavSheet() {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          title='Open navigation menu'
          className='sm:hidden'
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='no-scrollbar overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className='grid flex-1 auto-rows-min px-4'>
          <MainNav items={NAVIGATION_LINKS} shouldCloseSheet />
        </nav>
        <SheetFooter>
          {isAuthenticated ? (
            <SheetClose asChild>
              <Button
                variant='ghost'
                className='justify-start'
                onClick={() => signOut()}
              >
                <LogOut /> Log Out
              </Button>
            </SheetClose>
          ) : (
            <>
              <SheetClose asChild>
                <Button variant='outline' asChild>
                  <Link href='/sign-in'>Log in</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href='/sign-up'>Sign Up</Link>
                </Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
