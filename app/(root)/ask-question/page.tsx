'use client';

import { CreateQuestionForm } from '@/components/question/CreateQuestionForm';
import { ROUTES } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AskQuestion() {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    router.push(ROUTES.signIn);
  }

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold'>Ask a Question</h1>
      <CreateQuestionForm />
    </>
  );
}
