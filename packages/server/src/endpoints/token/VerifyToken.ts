import { authTokenSchema, responseSuccessSchema } from '@/schemas';
import { verifyToken } from '@/services/token';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import type { ExecutionContext } from '@cloudflare/workers-types';
import { z } from 'zod';

const requestBody = authTokenSchema;
type RequestBody = z.infer<typeof requestBody>;

const responseResult = z.boolean();
type ResponseResult = z.infer<typeof responseResult>;

export default class VerifyToken extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { token, payload } = data.body;

    const isTokenVerified = await verifyToken(token, payload, false);
    return {
      success: true,
      result: isTokenVerified,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['token'],
    summary: 'Verify a token if it is valid, without checking the ban list',
    requestBody,
    responses: {
      200: {
        description: 'Return the verification result',
        schema: responseSuccessSchema(responseResult),
      },
    },
  };
}
