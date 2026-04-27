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
import { NAVIGATION_LINKS, ROUTES } from '@/lib/constants';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './header';

export function NavigationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' title='Open navigation menu' className='sm:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto no-scrollbar'>
        <SheetHeader>
          <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className='grid flex-1 auto-rows-min px-4'>
          <NavigationList shouldCloseSheet />
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

function NavigationList({
  shouldCloseSheet = false,
}: {
  shouldCloseSheet?: boolean;
}) {
  const userId = 1; // TODO: Replace with actual user ID from auth context
  const pathname = usePathname();

  return (
    <ul className='grid gap-2'>
      {NAVIGATION_LINKS.map(({ title, href, icon: Icon }) => {
        if (href === ROUTES.profile) {
          href = `${ROUTES.profile}/${userId}`;
        }
        const LinkComponent = (
          <Button
            asChild
            key={href}
            variant={pathname === href ? 'gradient-accent' : 'ghost'}
            className='h-12 w-full justify-start gap-2'
          >
            <Link href={href}>
              <Icon />
              {title}
            </Link>
          </Button>
        );
        return (
          <li key={href}>
            {shouldCloseSheet ? (
              <SheetClose asChild>{LinkComponent}</SheetClose>
            ) : (
              LinkComponent
            )}
          </li>
        );
      })}
    </ul>
  );
}
