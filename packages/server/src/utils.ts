import type { responseErrorSchema } from '@/schemas';
import { z } from 'zod';

export function responseError(message: string, status = 400) {
  return Response.json({
    success: false,
    message,
  } as z.infer<typeof responseErrorSchema>, {
    status,
  });
}
