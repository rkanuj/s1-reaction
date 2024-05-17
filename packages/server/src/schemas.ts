import { z } from 'zod';

const positiveInt = z.number().int().positive().finite();
const nonNegativeInt = z.number().int().nonnegative().finite();
const trimmedString = z.string().trim();
const datetime = z.string().datetime();

export const uidSchema = positiveInt
  .describe('User ID');

export const sidSchema = trimmedString
  .describe('Session ID, used for verifying uid')
  .regex(/^[a-zA-Z0-9]{6}$/);

export const pidSchema = positiveInt
  .describe('Post ID');
export const pidsSchema = z.array(pidSchema);

export const smileySchema = trimmedString
  .describe('Smiley string (S1 version)')
  .regex(/^\[[a-z]:\d{3,4}]$/);

export const reactSchema = z.object({
  smiley: smileySchema,
  count: positiveInt,
  reacted: nonNegativeInt
    .describe('Whether the user has reacted with this smiley, 0 for false, positive for true'),
}).describe('Reaction count with reacted status');
export const reactsSchema = z.array(reactSchema);

export const userReactSchema = z.object({
  smiley: smileySchema,
  count: positiveInt,
}).describe('Reaction count');
export const userReactsSchema = z.array(userReactSchema);

export const iatSchema = nonNegativeInt
  .describe('Issued at timestamp in seconds');

export const expSchema = nonNegativeInt
  .describe('Expiration time in seconds (0 for no expiration)');

export const payloadSchema = z.object({
  uid: uidSchema,
  iat: iatSchema,
  exp: expSchema,
}).describe('Token payload');

export const tokenSchema = trimmedString
  .describe('Generated token encoded in base64')
  .regex(/^([0-9a-zA-Z+/]{4}){11}|([0-9a-zA-Z+/]{4}){10}(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))$/);

export const authTokenSchema = z.object({
  token: tokenSchema,
  payload: payloadSchema,
}).describe('User authentication');

export const latestExpSchema = datetime
  .describe('Latest ban expiration datetime in ISO format');

export function responseSuccessSchema<T>(result: z.ZodType<T>) {
  return z.object({
    success: z.boolean(),
    result,
    message: z.string()
      .describe('Error message if success is false, otherwise undefined, compatible with response error'),
  });
}

export const responseErrorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
