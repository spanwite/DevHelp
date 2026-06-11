'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './ui/field';
import { Editor } from './editor';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { AnswerFormData, answerSchema } from '@/lib/schemas/answer';
import { Sparkles } from 'lucide-react';

export function AnswerForm() {
  const form = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: '',
    },
  });
  const formId = useId();
  const controlIds = {
    title: `${formId}-title`,
    description: `${formId}-description`,
    tags: `${formId}-tags`,
  };
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleSubmit = () => {};

  return (
    <form
      className='flex flex-col gap-6'
      id={formId}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup>
        <Controller
          name='content'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <FieldLabel
                  htmlFor={controlIds.description}
                  className='whitespace-normal'
                  required
                >
                  Write your answer
                </FieldLabel>
                <Button
                  type='button'
                  variant='outline'
                  form={formId}
                  disabled={form.formState.isSubmitting}
                  className='w-fit'
                >
                  <Sparkles className='text-accent' />
                  Generate answer with AI
                </Button>
              </div>
              <Editor {...field} markdown={field.value} ref={editorRef} />
              <FieldDescription>
                Answers with clear explanations and relevant code examples are
                more likely to be upvoted by the community.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type='submit'
        variant='gradient-accent'
        size='lg'
        form={formId}
        disabled={form.formState.isSubmitting}
        className='ml-auto w-fit'
      >
        {form.formState.isSubmitting ? 'Submitting...' : 'Post your answer'}
      </Button>
    </form>
  );
}
