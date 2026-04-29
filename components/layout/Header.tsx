import { cn } from '@/lib/utils';
import { Logo } from '../ui/Logo';
import { NavSheet } from '../navigation';
import { ThemeSwitcher } from '../theme';
import { Input } from '../ui/input';

export function Header() {
  return (
    <header
      className={cn(
        'border-input bg-background sticky top-0 z-10 flex h-(--header-height) items-center justify-between gap-2 border-b px-7'
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
      </div>
    </header>
  );
}
