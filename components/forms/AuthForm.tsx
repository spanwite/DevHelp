import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { capitalizeFirstLetter } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { type ZodType } from 'zod/v3';

export function AuthForm<FormFields extends FieldValues>({
  schema,
  defaultValues,
}: {
  schema: ZodType<FormFields, any>;
  defaultValues: FormFields;
}) {
  const isSignUp = 'username' in defaultValues;
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FormFields>,
  });
  const formId = useId();

  function handleSubmit(data: FormFields) {
    // TODO: Implement actual authentication logic here
    toast('You submitted the following values:', {
      description: (
        <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
  }

  const renderField = (fieldName: string) => {
    const controlId = `${formId}-${fieldName}`;
    const controlPropsVariants: Record<
      string,
      React.ComponentProps<typeof Input>
    > = {
      email: {
        type: 'email',
        autoComplete: 'email',
      },
      password: {
        type: 'password',
        autoComplete: 'current-password',
      },
    };
    const controlProps = controlPropsVariants[fieldName] || {};
    const fieldLabel =
      fieldName === 'email'
        ? 'Email address'
        : capitalizeFirstLetter(fieldName);
    return (
      <Controller
        key={fieldName}
        name={fieldName as Path<FormFields>}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={controlId}>{fieldLabel}</FieldLabel>
            <Input
              {...field}
              id={controlId}
              aria-invalid={fieldState.invalid}
              {...controlProps}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    );
  };

  return (
    <form id={formId} onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        {Object.keys(defaultValues).map(renderField)}
        <Button
          type='submit'
          variant='gradient-accent'
          form={formId}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? isSignUp
              ? 'Signing up...'
              : 'Signing in...'
            : isSignUp
              ? 'Sign Up'
              : 'Sign In'}
        </Button>
      </FieldGroup>
    </form>
  );
}
