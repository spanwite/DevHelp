import { Header } from '@/components/layout/Header';
import { MainSidebar } from '@/components/layout/MainSidebar';
import { SecondarySidebar } from '@/components/layout/SecondarySidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className='flex flex-1'>
        <MainSidebar />
        <main className='flex-1'>{children}</main>
        <SecondarySidebar />
      </div>
    </>
  );
}
