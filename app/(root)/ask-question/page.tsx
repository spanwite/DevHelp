import { auth } from '@/auth';
import { QuestionForm } from '@/components/question';
import { ROUTES } from '@/lib/constants';
import { redirect } from 'next/navigation';

export default async function AskQuestion() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.signIn);
  }

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold'>Ask a Question</h1>
      <QuestionForm />
    </>
  );
}
