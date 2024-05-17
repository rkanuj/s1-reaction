import {
  authTokenSchema,
  expSchema,
  latestExpSchema,
  responseErrorSchema,
  responseSuccessSchema,
  tokenSchema,
  uidSchema,
} from '@/schemas';
import { queryExpiredAtByToken, queryExpiredAtByUID, updateBanListByToken, updateBanListByUID } from '@/services/ban';
import { verifyAdminToken } from '@/services/token';
import { responseError } from '@/utils';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import type { ExecutionContext } from '@cloudflare/workers-types';
import { z } from 'zod';

const requestBody = z.object({
  uid: uidSchema
    .describe('User ID to ban')
    .optional(),
  token: tokenSchema
    .describe('Token to ban')
    .optional(),
  exp: expSchema
    .describe('Ban expiration time in seconds (0 for remove), ' +
      'leave undefined to query latest ban expiration datetime')
    .optional(),
  adminAuth: authTokenSchema,
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = latestExpSchema
  .describe('Latest ban expiration datetime in ISO format, null for no ban')
  .nullable();
type ResponseResult = z.infer<typeof responseResult>;

export default class BanUserOrToken extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { uid, token, exp, adminAuth } = data.body;

    if (uid === undefined && token === undefined) {
      return {
        success: true,
        result: null,
      };
    }

    const isTokenVerified = await verifyAdminToken(adminAuth.token, adminAuth.payload);
    if (!isTokenVerified) {
      return responseError('Invalid admin token', 401);
    }

    const latestExp = await (async () => {
      if (exp === undefined) {
        if (uid !== undefined) {
          return await queryExpiredAtByUID(uid);
        }
        if (token !== undefined) {
          return await queryExpiredAtByToken(token);
        }
      } else {
        if (uid !== undefined) {
          return await updateBanListByUID(uid, exp);
        }
        if (token !== undefined) {
          return await updateBanListByToken(token, exp);
        }
      }
      return null;
    })();

    return {
      success: true,
      result: latestExp,
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['admin'],
    summary: 'Ban a user or token',
    requestBody,
    responses: {
      200: {
        description: 'Return the latest ban expiration datetime, null for no ban',
        schema: responseSuccessSchema(responseResult),
      },
      401: {
        description: 'Admin authentication failed',
        schema: responseErrorSchema,
      },
    },
  };
}
