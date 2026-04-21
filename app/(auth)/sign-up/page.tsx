import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SignUp() {
  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Create your account</h2>
          <div className='text-muted-foreground'>to continue to DevFlow</div>
        </div>
        <Image src='/logomark.svg' alt='DevExchange Logomark' width={50} height={50} />
      </div>
      <div className='flex gap-2.5'>
        <Button variant='outline'>
          <Image src='/github.svg' alt='Github Logomark' width={20} height={20} /> Login with
          GitHub
        </Button>
        <Button variant='outline'>
          <Image src='/google.svg' alt='Google Logomark' className='text-foreground' width={20} height={20} color='#ffffff' /> Login with
          Google
        </Button>
      </div>
    </>
  );
}
