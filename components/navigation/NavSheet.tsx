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
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '../header';
import { NavMain } from './NavMain';
import { NAVIGATION_LINKS } from '@/lib/constants';

export function NavSheet() {
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
          <NavMain items={NAVIGATION_LINKS} shouldCloseSheet />
        </nav>
        <SheetFooter>
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
