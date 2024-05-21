import * as runtime from '@/api/gen/runtime';
import SmilesModule from '@/smilesModule';

export interface Post200Response {
  success: boolean;
  code: number;
  message: string;
}

export interface GetSmiles200Response extends Post200Response {
  data: SmilesData[];
}

export default class S1ApiOffline extends runtime.BaseAPI {
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
