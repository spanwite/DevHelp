'use client';

import { Button } from '@/components/ui/button';
import { QuestionFormData, questionSchema } from '@/lib/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field';
import { Input } from '../ui/input';
import { Editor } from '../editor';
import { MDXEditorMethods } from '@mdxeditor/editor';

export function QuestionForm() {
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });
  const formId = useId();
  const controlIds = {
    title: `${formId}-title`,
    description: `${formId}-description`,
    tags: `${formId}-tags`,
  };
  const editorRef = useRef<MDXEditorMethods>(null);

  const onSubmit = (data: QuestionFormData) => {
    // TODO: Implement form submission logic
  };

  return (
    <form
      className='flex flex-col gap-6'
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={controlIds.title} required>
                Title
              </FieldLabel>
              <Input
                {...field}
                id={controlIds.title}
                aria-invalid={fieldState.invalid}
                autoComplete='off'
                required
              />
              <FieldDescription>
                Be specific and imagine you’re asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='description'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={controlIds.description} required>
                Detailed explanation of your problem?
              </FieldLabel>
              <Editor {...field} markdown={field.value} ref={editorRef} />
              <FieldDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='tags'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={controlIds.tags} required>
                Tags
              </FieldLabel>
              <Input
                {...field}
                id={controlIds.tags}
                aria-invalid={fieldState.invalid}
                autoComplete='off'
                required
              />
              <FieldDescription>
                Be specific and imagine you’re asking a question to another
                person.
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
        {form.formState.isSubmitting
          ? 'Asking a Question...'
          : 'Ask a Question'}
      </Button>
    </form>
  );
}
