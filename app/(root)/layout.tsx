import { Header, Logo, ThemeSwitcher } from '@/components/header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { NavSheet } from '@/components/navigation';
import { RightSidebar } from '@/components/RightSidebar';
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
          <NavSheet />
        </div>
      </Header>
      <div className='flex flex-1'>
        <LeftSidebar />
        <main className='flex-1'>{children}</main>
        <RightSidebar />
      </div>
    </>
  );
}
