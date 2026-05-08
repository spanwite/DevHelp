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
import { tagAliases } from './constants';
import MaybeImage from '../utils/MaybeImage.client';
import { getDeviconUrl } from '@/lib/utils';
import { X } from 'lucide-react';

export function QuestionForm() {
  const form = useForm<QuestionFormData>({
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
    console.log('Form submitted with data:', data);
    // TODO: Implement form submission logic
  };

  const onTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const existingTags = form.getValues('tags');
      if (existingTags.length >= 5) {
        form.setError('tags', {
          type: 'manual',
          message: 'You can only add up to 5 tags.',
        });
        return;
      }

      const tagInput = event.currentTarget.value.trim().toLowerCase();

      if (!tagInput) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag cannot be empty',
        });
        return;
      }

      const newTag =
        tagAliases.find((lang) => lang.alias.includes(tagInput))?.name ?? null;
      if (!newTag) {
        form.setError('tags', {
          type: 'manual',
          message:
            'Tag not recognized. Please enter a valid programming language or technology.',
        });
        return;
      }

      const isExistsingTag = existingTags.some((tag) => tag === newTag);
      if (isExistsingTag) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag already added',
        });
        return;
      }

      form.clearErrors('tags');
      form.setValue('tags', [...existingTags, newTag]);
      event.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string) => {
    const existingTags = form.getValues('tags');
    const newTags = existingTags.filter((t) => t !== tag);
    form.setValue('tags', newTags);
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
              <FieldLabel htmlFor={controlIds.tags}>
                Tags
              </FieldLabel>
              <Input
                onKeyDown={onTagKeyDown}
                id={controlIds.tags}
                aria-invalid={fieldState.invalid}
                autoComplete='off'
              />
              <FieldDescription>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <ul className='flex flex-wrap items-center gap-2'>
                {field.value.map((tag) => (
                  <li key={tag}>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => removeTag(tag)}
                    >
                      <MaybeImage
                        src={getDeviconUrl(tag)}
                        alt={tag}
                        width={14}
                        height={14}
                      />
                      {tag}
                      <X />
                    </Button>
                  </li>
                ))}
              </ul>
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
