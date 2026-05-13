import { ZodSchema } from 'zod/v3';
import { ValidationError } from './errors';

export async function parseJson(req: Request) {
  try {
    return await req.json();
  } catch {
    throw new ValidationError('Invalid JSON in request body', {
      field: 'body',
      reason: 'Malformed JSON',
    });
  }
}

export async function parseSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> {
  const {
    success,
    error,
    data: validatedData,
  } = await schema.safeParseAsync(data);
  if (success) {
    return validatedData;
  }
  throw new ValidationError('Validation failed', {
    fields: error.flatten().fieldErrors,
  });
}
