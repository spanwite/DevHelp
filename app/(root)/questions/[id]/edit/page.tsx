import { auth } from '@/auth';
import { EditQuestionForm } from '@/components/question/EditQuestionForm';
import { findQuestionById } from '@/lib/actions/question';
import { ROUTES } from '@/lib/constants';
import { notFound, redirect } from 'next/navigation';

async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: questionId } = await params;
  if (!questionId) {
    return notFound();
  }

  const session = await auth();
  if (!session) {
    redirect(ROUTES.signIn);
  }

  const question = await findQuestionById(questionId);
  if (!question) {
    return notFound();
  }

  if (question.creator.toString() !== session.user?.id) {
    redirect(ROUTES.question(questionId));
  }

  return <EditQuestionForm data={{ ...question, id: questionId }} />;
}

export default EditQuestionPage;
