import { Header, Logo, ThemeSwitcher } from '@/components/header';
import { NavigationSheet, NavigationSidebar } from '@/components/navigation';
import { Input } from '@/components/ui/input';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className='sticky top-0 z-10'>
        <Logo />
        <Input
          placeholder='Search something...'
          className='max-xs:hidden max-w-64'
        />
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <NavigationSheet />
        </div>
      </Header>
      <div className='flex flex-1'>
        <NavigationSidebar />
        <main className='flex-1'>{children}</main>
      </div>
    </>
  );
}
