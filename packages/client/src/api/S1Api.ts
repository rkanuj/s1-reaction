import * as runtime from '@/api/gen/runtime';
import SmilesModule from '@/smilesModule';
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

interface Post200Response {
  success: boolean;
  code: number;
  message: string;
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

export interface GetSmiles200Response extends Post200Response {
  data: SmilesData[];
}

export default class S1Api extends runtime.BaseAPI {
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

  async getSmiles(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSmiles200Response> {
    if (import.meta.env.VITE_SKIP_S1) {
      const json = await SmilesModule.getJSON();
      for (const smiles of json) {
        for (const smile of smiles.list) {
          smile.url = await SmilesModule.replaceWithLocal(smile.url);
        }
      }
      return {
        success: true,
        code: 200,
        message: '',
        data: json,
      };
    }
    const response = await this.getSmilesRaw(initOverrides);
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

  private async getSmilesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSmiles200Response>> {
    const queryParameters: any = {};
    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: '/post/smiles',
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }
}
