import { Header, Logo, ThemeSwitcher } from '@/components/header';
import { NavigationButton } from '@/components/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <Logo />
        <input type='text' placeholder='Global search...' />
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <NavigationButton />
        </div>
      </Header>
      <main>{children}</main>
    </>
  );
}
