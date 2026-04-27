import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href='/' className='inline-flex items-center gap-1 shrink-0'>
      <Image
        src='/logomark.svg'
        alt='Site Logomark'
        width={32}
        height={32}
      />
      <span className='text-2xl font-bold max-sm:hidden'>
        Dev<span className='text-accent'>Exchange</span>
      </span>
    </Link>
  );
}
