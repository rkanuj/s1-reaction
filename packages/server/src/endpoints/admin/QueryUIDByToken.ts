import { authTokenSchema, responseErrorSchema, responseSuccessSchema, tokenSchema, uidSchema } from '@/schemas';
import { queryUIDByToken, verifyAdminToken } from '@/services/token';
import { responseError } from '@/utils';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import { z } from 'zod';

const requestBody = z.object({
  token: tokenSchema
    .describe('Token to query'),
  adminAuth: authTokenSchema,
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = uidSchema
  .describe('User ID, null if not found')
  .nullable();
type ResponseResult = z.infer<typeof responseResult>;

export default class QueryUIDByToken extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { token, adminAuth } = data.body;

    const isTokenVerified = await verifyAdminToken(adminAuth.token, adminAuth.payload);
    if (!isTokenVerified) {
      return responseError('Invalid admin token', 401);
    }

    const uid = await queryUIDByToken(token);
    return {
      success: true,
      result: uid,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['admin'],
    summary: 'Query UID by token',
    requestBody,
    responses: {
      200: {
        description: 'Return the UID, null if not found',
        schema: responseSuccessSchema(responseResult),
      },
      401: {
        description: 'Admin authentication failed',
        schema: responseErrorSchema,
      },
    },
  };
}
