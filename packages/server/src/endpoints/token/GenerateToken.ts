import AppEnv from '@/env';
import {
  authTokenSchema,
  expSchema,
  payloadSchema,
  responseErrorSchema,
  responseSuccessSchema,
  sidSchema,
  uidSchema,
} from '@/schemas';
import { generateToken } from '@/services/token';
import { responseError } from '@/utils';
import { OpenAPIRoute, type OpenAPIRouteSchema } from '@cloudflare/itty-router-openapi';
import type { ExecutionContext } from '@cloudflare/workers-types';
import { currentTimestamp, obj2form, responseErrorHandle } from 'shared';
import { z } from 'zod';

const requestBody = z.object({
  uid: uidSchema,
  sid: sidSchema,
  exp: expSchema,
});
type RequestBody = z.infer<typeof requestBody>;

const responseResult = authTokenSchema;
type ResponseResult = z.infer<typeof responseResult>;

export default class GenerateToken extends OpenAPIRoute {
  async handle(_request: Request, _ctx: ExecutionContext,
               data: RequestData<RequestBody>): Promise<ResponseData<ResponseResult>> {
    const { uid, sid, exp } = data.body;

    if (!AppEnv.SKIP_S1) {
      const result = await fetch(`${ AppEnv.S1_APP_API_URL }/history/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: obj2form({
          sid,
          pageNo: 1,
          pageSize: 1,
        }),
      }).then(response => {
        return response.json() as Promise<ResponseS1HistoryPostResult>;
      }).catch(responseErrorHandle<ResponseS1HistoryPostResult>);

      if (!result.success) {
        return responseError(result.message || '提供的 sid 无效或 S1 接口异常', 401);
      }
      if ((result?.data?.list?.length ?? 0) > 0) {
        if (result.data.list[0].authorid !== uid) {
          return responseError('提供的 uid 与 sid 不匹配', 401);
        }
      } else {
        return responseError('用户无可用于验证的历史回帖', 401);
      }
    }

    const payload: z.infer<typeof payloadSchema> = {
      uid,
      iat: currentTimestamp(),
      exp,
    };
    const token = generateToken(payload);

    return {
      success: true,
      result: {
        token,
        payload,
      },
    };
  }

  static schema: OpenAPIRouteSchema = {
    tags: ['token'],
    summary: 'Generate a token for user',
    requestBody,
    responses: {
      200: {
        description: 'Return the payload and generated token',
        schema: responseSuccessSchema(responseResult),
      },
      401: {
        description: 'Invalid uid or sid provided',
        schema: responseErrorSchema,
      },
    },
  };
}
