'use client';

import { ROUTES } from '@/lib/constants';
import { QuestionFormData } from '@/lib/schemas/question';
import { toast } from 'sonner';
import { QuestionForm } from './QuestionForm';
import { useRouter } from 'next/navigation';
import { updateQuestionById } from '@/lib/actions/question';

export function EditQuestionForm({
  data,
}: {
  data: QuestionFormData & { id: string };
}) {
  const router = useRouter();

  const handleSubmit = async (formData: QuestionFormData) => {
    try {
      const question = await updateQuestionById(data.id, formData);

      toast.success('Question updated successfully', {
        description: 'Your question has been updated successfully.',
      });

      router.push(ROUTES.question(question._id));
    } catch (error) {
      const isError = error instanceof Error;
      toast.error(isError ? error.name : 'Question update failed', {
        description: isError ? error.message : 'Unknown error occured.',
      });
    }
  };

  return (
    <QuestionForm
      defaultValues={data}
      onSubmit={handleSubmit}
      intent='update'
    />
  );
}
