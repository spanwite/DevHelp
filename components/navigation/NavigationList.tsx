'use client';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { NAVIGATION_LINKS, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationList({
  shouldCloseSheet = false,
}: {
  shouldCloseSheet?: boolean;
}) {
  const userId = 1; // TODO: Replace with actual user ID from auth context
  const pathname = usePathname();

  return (
    <ul className='grid gap-2'>
      {NAVIGATION_LINKS.map(({ title, href, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
        if (href === ROUTES.profile) {
          href = `${ROUTES.profile}/${userId}`;
        }
        const LinkComponent = (
          <Button
            asChild
            key={href}
            variant={isActive ? 'gradient-accent' : 'ghost'}
            className={cn('h-12 w-full justify-start gap-2', isActive && 'font-bold')}
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
