import {
  authTokenSchema,
  pidSchema,
  reactsSchema,
  responseErrorSchema,
  responseSuccessSchema,
  smileySchema,
  uidSchema,
} from '@/schemas';
import { updatePostReact } from '@/services/react';
import { verifyToken } from '@/services/token';
import { responseError } from '@/utils';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import { z } from 'zod';

const requestBody = z.object({
  pid: pidSchema,
  uid2: uidSchema
    .describe('User ID of the poster'),
  smiley: smileySchema
    .describe('Smiley to react with, null to remove reaction')
    .nullable(),
  auth: authTokenSchema,
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = reactsSchema;
type ResponseResult = z.infer<typeof responseResult>;

export default class UpdatePostReact extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { pid, uid2, smiley, auth } = data.body;

    const isTokenVerified = await verifyToken(auth.token, auth.payload);
    if (!isTokenVerified) {
      return responseError('Invalid token', 401);
    }

    const reacts = await updatePostReact(pid, auth.payload.uid, uid2, smiley, auth.token);
    const result = reacts.map(react => {
      return {
        smiley: react.smiley,
        count: react.count,
        reacted: react.reacted,
      };
    });

    return {
      success: true,
      result,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['react'],
    summary: 'Update reaction for post',
    requestBody,
    responses: {
      200: {
        description: 'Return the updated reactions',
        schema: responseSuccessSchema(responseResult),
      },
      401: {
        description: 'Authentication failed',
        schema: responseErrorSchema,
      },
    },
  };
}
