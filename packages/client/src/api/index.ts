import { Configuration, type PostUpdatePostReact200Response, ReactApi, TokenApi } from '@/api/gen';
import S1Api from '@/api/S1Api';
import { reactsDict } from '@/store';
import { justAlert } from '@/utils';
import { deepCopy, responseErrorHandle } from 'shared';

const config = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
});

export const authApi = new TokenApi(config);
export const reactApi = new ReactApi(config);
export const s1Api = new S1Api(new Configuration({
  basePath: import.meta.env.VITE_S1_APP_API_URL,
}));

export async function reactApiUpdatePostReact(post: {
  pid: number,
  uid: number
}, smiley: string | null, user: UserInfo) {
  const response = await reactApi.postUpdatePostReact({
    postUpdatePostReactRequest: {
      pid: post.pid,
      uid2: post.uid,
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
