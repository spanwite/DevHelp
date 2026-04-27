import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/components/ui/link';
import { FieldValues } from 'react-hook-form';
import { type ZodType } from 'zod/v3';
import { AuthForm } from './forms/AuthForm';
import { SocialAuthForm } from './forms/SocialAuthForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export function Auth<FormFields extends FieldValues>({
  className,
  schema,
  defaultValues,
  ...props
}: React.ComponentProps<typeof Card> & {
  schema: ZodType<FormFields, any>;
  defaultValues: FormFields;
}) {
  const isSignUp = 'username' in defaultValues;

  return (
    <Card
      className={cn('w-full sm:max-w-md', className)}
      {...props}
    >
      <CardHeader
        className={cn('flex items-center justify-between gap-2', className)}
      >
        <div>
          <CardTitle>{isSignUp ? 'Create your account' : 'Sign In'}</CardTitle>
          <CardDescription>To continue to DevExchange</CardDescription>
        </div>
        <Image
          src='/logomark.svg'
          alt='DevExchange Logomark'
          width={36}
          height={36}
        />
      </CardHeader>
      <CardContent>
        <AuthForm schema={schema} defaultValues={defaultValues} />
      </CardContent>
      <CardFooter className='flex-col gap-4'>
        <div className='flex flex-wrap items-center justify-center'>
          <span className='text-center'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <Link
            href={isSignUp ? ROUTES.signIn : ROUTES.signUp}
            className='text-accent font-medium'
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </div>
        <SocialAuthForm />
      </CardFooter>
    </Card>
  );
}
