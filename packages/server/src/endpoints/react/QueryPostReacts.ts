import { authTokenSchema, pidSchema, pidsSchema, reactsSchema, responseSuccessSchema } from '@/schemas';
import { queryPostReacts, queryPostReactsBatch } from '@/services/react';
import { verifyToken } from '@/services/token';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import { z } from 'zod';

const requestBody = z.object({
  pids: pidsSchema
    .describe('Post IDs to query, must be non-empty')
    .nonempty(),
  auth: authTokenSchema
    .describe('User authentication, ' +
      'used for checking if user has reacted to the related posts, leave undefined to skip')
    .optional(),
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = z.array(z.object({
  pid: pidSchema,
  reacts: reactsSchema,
}).describe('Post ID and its reactions'));
type ResponseResult = z.infer<typeof responseResult>;

export default class QueryPostReacts extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { pids, auth } = data.body;

    const uid = await (async () => {
      if (auth === undefined) {
        return;
      }
      const isTokenVerified = await verifyToken(auth.token, auth.payload);
      if (isTokenVerified) {
        return auth.payload.uid;
      }
    })();

    const result = await (async () => {
      const reactsList = await (async () => {
        if (pids.length === 1) {
          return [await queryPostReacts(pids[0], uid)];
        }
        return await queryPostReactsBatch(pids, uid);
      })();

      return reactsList.filter(reacts => {
        return reacts.length > 0;
      }).map(reacts => {
        const pid = reacts[0].pid;
        return {
          pid,
          reacts,
        };
      });
    })();

    return {
      success: true,
      result,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['react'],
    summary: 'Query reactions for post',
    requestBody,
    responses: {
      200: {
        description: 'Return the post IDs and their reactions',
        schema: responseSuccessSchema(responseResult),
      },
    },
  };
}
