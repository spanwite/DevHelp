import { SocialAuthForm } from '@/components/forms/SocialAuthForm';
import Image from 'next/image';

export default  function SignUp() {
  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Create your account</h2>
          <div className='text-muted-foreground'>to continue to DevFlow</div>
        </div>
        <Image
          src='/logomark.svg'
          alt='DevExchange Logomark'
          width={50}
          height={50}
        />
      </div>
      <SocialAuthForm />
    </>
  );
}
