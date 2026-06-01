'use client';

import { ROUTES } from '@/lib/constants';
import { QuestionFormData } from '@/lib/schemas/question';
import { toast } from 'sonner';
import { QuestionForm } from './QuestionForm';
import { useRouter } from 'next/navigation';
import { createQuestion } from '@/lib/actions/question';

export function CreateQuestionForm() {
  const router = useRouter();

  const handleSubmit = async (data: QuestionFormData) => {
    try {
      const question = await createQuestion(data);

      toast.success('Question created successfully', {
        description: 'Your question has been created successfully.',
      });

      router.push(ROUTES.question(question._id));
    } catch (error) {
      const isError = error instanceof Error;
      toast.error(isError ? error.name : 'Question creation failed', {
        description: isError ? error.message : 'Unknown error occured.',
      });
    }
  };

  return <QuestionForm onSubmit={handleSubmit} />;
}
