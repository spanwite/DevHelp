import { cn } from '@/lib/utils';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden'
      )}
    >
      <div className='*:pointer-events-none *:-z-10'>
        <div className='bg-auth absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 dark:opacity-20' />
        <div
          className='absolute -top-[20%] -left-[10%] -z-10 hidden h-full w-[30%] rounded-[70%] bg-[#1A1A34] opacity-40 blur-[200px] dark:block'
          aria-hidden
        />
        <div
          className='absolute -right-[15%] -bottom-[10%] hidden h-[50%] w-[40%] rounded-[90%] bg-[#1A1A34] opacity-40 blur-[200px] dark:block'
          aria-hidden
        />
      </div>
      <section className='bg-muted space-y-10 rounded-md px-8 py-10 shadow-3xl' >
        {children}
      </section>
    </main>
  );
}
