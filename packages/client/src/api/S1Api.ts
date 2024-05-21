import * as runtime from '@/api/gen/runtime';
import S1ApiOffline, { type Post200Response } from '@/api/S1ApiOffline';
import { obj2form, randomInt } from 'shared';

interface PostLoginOperationRequest {
  username: string;
  password: string;
  questionid?: string;
  answer?: string;

  [key: string]: string | undefined;
}

interface PostLogoutOperationRequest {
  sid: string;

  [key: string]: string | undefined;
}

export interface PostLogin200Response extends Post200Response {
  data: {
    uid: string;
    username: string;
    sid: string;
  };
}

export interface PostLogout200Response extends Post200Response {
}

export default class S1Api extends S1ApiOffline {
  async postLogin(requestParameters: PostLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostLogin200Response> {
    if (import.meta.env.VITE_SKIP_S1) {
      const randomUID = randomInt(1000, 9999);
      return {
        success: true,
        code: 200,
        message: '',
        data: {
          uid: String(randomUID),
          username: `test${ randomUID }`,
          sid: 'test00',
        },
      };
    }
    const response = await this.postLoginRaw(requestParameters, initOverrides);
    return await response.value();
  }

  async postLogout(requestParameters: PostLogoutOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostLogout200Response> {
    if (import.meta.env.VITE_SKIP_S1) {
      return {
        success: true,
        code: 200,
        message: '',
      };
    }
    const response = await this.postLogoutRaw(requestParameters, initOverrides);
    return await response.value();
  }

  private async postLoginRaw(requestParameters: PostLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostLogin200Response>> {
    const queryParameters: any = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    const response = await this.request({
      path: '/user/login',
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: obj2form(requestParameters),
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  private async postLogoutRaw(requestParameters: PostLogoutOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostLogout200Response>> {
    const queryParameters: any = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    const response = await this.request({
      path: '/user/logout',
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: obj2form(requestParameters),
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }
}
