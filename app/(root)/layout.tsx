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
        <main className='xs:px-9 mx-auto max-w-7xl flex-1 px-4 py-16'>
          {children}
        </main>
        <SecondarySidebar />
      </div>
    </>
  );
}
