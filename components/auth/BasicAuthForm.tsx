import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { capitalizeFirstLetter } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { type ZodType } from 'zod/v3';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export function BasicAuthForm<FormFields extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: {
  schema: ZodType<FormFields, any>;
  defaultValues: FormFields;
  onSubmit: (data: FormFields) => unknown;
}) {
  const isSignUp = 'username' in defaultValues;
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FormFields>,
  });
  const formId = useId();
  const messages = {
    label: isSignUp ? 'Sign Up' : 'Sign In',
    wip: isSignUp ? 'Signing up...' : 'Signing in...',
    done: isSignUp ? 'Signed up' : 'Signed in',
  };

  const handleSubmit = async (data: FormFields) => {
    try {
      await onSubmit(data);

      toast.success(`${messages.label} successful`, {
        description: `${messages.done} successfully. Redirecting to home page...`,
      });

      router.push(ROUTES.home);
    } catch (error) {
      toast.error(`${messages.label} failed`, {
        description:
          error instanceof Error ? error.message : 'Unknown error occured.',
      });
    }
  };

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
          {form.formState.isSubmitting ? messages.wip : messages.label}
        </Button>
      </FieldGroup>
    </form>
  );
}
