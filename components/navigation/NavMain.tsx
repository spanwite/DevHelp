'use client';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId } from 'react';

export function NavMain({
  items,
  shouldCloseSheet = false,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  shouldCloseSheet?: boolean;
}) {
  const userId = 1; // TODO: Replace with actual user ID from auth context
  const pathname = usePathname();
  const titleId = useId();

  return (
    <nav aria-labelledby={titleId} className='w-full'>
      <h2 id={titleId} className='sr-only'>Основная навигация по сайту</h2>
      <ul className='grid gap-2'>
        {items.map(({ title, url, icon: Icon }) => {
          const isActive =
            pathname === url || (url !== '/' && pathname.startsWith(url));
          if (url === ROUTES.profile) {
            url = `${ROUTES.profile}/${userId}`;
          }
          const LinkComponent = (
            <Button
              asChild
              key={url}
              variant={isActive ? 'gradient-accent' : 'ghost'}
              className={cn(
                'h-12 w-full justify-start gap-2',
                isActive && 'font-bold'
              )}
            >
              <Link href={url}>
                <Icon />
                {title}
              </Link>
            </Button>
          );
          return (
            <li key={url}>
              {shouldCloseSheet ? (
                <SheetClose asChild>{LinkComponent}</SheetClose>
              ) : (
                  LinkComponent
                )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
