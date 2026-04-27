import { Header, Logo, ThemeSwitcher } from '@/components/header';
import { NavigationButton } from '@/components/navigation';
import { Input } from '@/components/ui/input';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <Logo />
        <Input placeholder='Search something...' className='max-w-64 max-xs:hidden'/>
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <NavigationButton />
        </div>
      </Header>
      <main>{children}</main>
    </>
  );
}
