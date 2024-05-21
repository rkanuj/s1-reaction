import { Configuration, type PostUpdatePostReact200Response, ReactApi, TokenApi } from '@/api/gen';
import { ReactApiOffline } from '@/api/ReactApiOffline';
import S1Api from '@/api/S1Api';
import S1ApiOffline from '@/api/S1ApiOffline';
import { reactsDict, reactsOfflineDict } from '@/store';
import { justAlert } from '@/utils';
import { deepCopy, responseErrorHandle } from 'shared';

export default class API {
  static authApi: TokenApi;
  static reactApi: ReactApi;
  static reactApiOffline: ReactApiOffline;
  static s1Api: S1Api;
  static s1ApiOffline: S1ApiOffline;

  static init() {
    const configServer = new Configuration({
      basePath: import.meta.env.VITE_API_URL,
    });

    const configS1Api = new Configuration({
      basePath: import.meta.env.VITE_S1_APP_API_URL,
    });

    if (!import.meta.env.VITE_OFFLINE) {
      this.authApi = new TokenApi(configServer);
      this.reactApi = new ReactApi(configServer);
      this.s1Api = new S1Api(configS1Api);
    } else {
      this.reactApiOffline = new ReactApiOffline();
      this.s1ApiOffline = new S1ApiOffline(configS1Api);
    }
  }
}

API.init();

export async function reactApiUpdatePostReact(post: {
  pid: number,
  uid2: number
}, smiley: string | null, user: UserInfo) {
  const response = await API.reactApi.postUpdatePostReact({
    postUpdatePostReactRequest: {
      pid: post.pid,
      uid2: post.uid2,
      smiley,
      auth: user.auth,
    },
  }).catch(responseErrorHandle<PostUpdatePostReact200Response>);

  if (!response.success) {
    justAlert(response.message || '更新回应失败');
    return false;
  }

  reactsDict.update(dict => {
    const newDict = deepCopy(dict);
    newDict[`pid${ post.pid }`] = response.result.map(react => {
      return {
        smiley: react.smiley,
        count: react.count,
        reacted: react.reacted > 0,
      };
    });
    return newDict;
  });

  return true;
}

export function reactApiOfflineUpdatePostReacts(post: {
  pid: number,
  uid2: number
}, smiley: string | null, remark = '', deleteFromUser = false) {
  const result = API.reactApiOffline.postUpdatePostReact({
    pid: post.pid,
    uid2: post.uid2,
    smiley,
    remark,
  });

  if (deleteFromUser) {
    const result = API.reactApiOffline.postQueryUserReacts({
      uid2: post.uid2,
    });
    reactsOfflineDict.set({
      received: result,
    });
    return true;
  }

  reactsOfflineDict.update(dict => {
    const newDict = deepCopy(dict);
    if (result.length === 0) {
      newDict[`pid${ post.pid }`] = [];
    } else {
      newDict[`pid${ post.pid }`] = [result[0].react];
    }
    return newDict;
  });

  return true;
}
