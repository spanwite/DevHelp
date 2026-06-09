import { cn } from '@/lib/utils';
import { Logo } from '../ui/Logo';
import { NavSheet } from '../navigation';
import { ThemeSwitcher } from '../theme';
import { Input } from '../ui/input';
import { UserAvatar } from '../UserAvatar';
import { auth } from '@/auth';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <header
      className={cn(
        'border-input bg-background sticky top-0 flex h-(--header-height) items-center justify-between gap-2 border-b px-7'
      )}
    >
      <Logo />
      <Input
        placeholder='Search something...'
        className='max-xs:hidden max-w-64'
      />
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <NavSheet />
        {session?.user?.id && (
          <Link href={ROUTES.profile(session.user.id)}>
            <UserAvatar name={session.user.name} image={session.user.image} />
          </Link>
        )}
      </div>
    </header>
  );
}
