import { responseSuccessSchema, uidSchema, userReactsSchema } from '@/schemas';
import { queryUserReacts } from '@/services/react';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import { z } from 'zod';

const requestBody = z.object({
  uid: uidSchema
    .describe('User ID to query'),
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = z.object({
  sent: userReactsSchema
    .describe('Reactions sent by the user'),
  received: userReactsSchema
    .describe('Reactions received from other users'),
}).describe('User reactions');
type ResponseResult = z.infer<typeof responseResult>;

export default class QueryUserReacts extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { uid } = data.body;

    const result = await queryUserReacts(uid);

    return {
      success: true,
      result,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['react'],
    summary: 'Query reactions for user',
    requestBody,
    responses: {
      200: {
        description: 'Return the user reactions',
        schema: responseSuccessSchema(responseResult),
      },
    },
  };
}
