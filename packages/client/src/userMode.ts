import { reactApi } from '@/api';
import type { PostQueryUserReacts200Response } from '@/api/gen';
import UserReacts from '@/components/UserReacts.svelte';
import { reactsDict } from '@/store';
import { extractId, justAlert, justLogError } from '@/utils';
import { responseErrorHandle } from 'shared';

export async function userMode() {
  const uid = extractId(location.href, /\/space-uid-(\d+)\.html$/);
  if (uid === null) {
    return;
  }

  const positionElement = document.querySelector<HTMLDivElement>('div[id=psts]');
  if (!positionElement) {
    return;
  }

  const mountElement = document.createElement('div');
  mountElement.classList.add('s1-reaction');
  mountElement.classList.add('s1-reaction-user');
  mountElement.setAttribute('data-id', String(uid));

  positionElement.parentElement!.append(mountElement);

  new UserReacts({
    target: mountElement,
  });

  const response = await reactApi.postQueryUserReacts({
    postQueryUserReactsRequest: {
      uid,
    },
  }).catch(responseErrorHandle<PostQueryUserReacts200Response>);

  if (!response.success) {
    justAlert('获取用户回应失败');
    if (response.message) {
      justLogError(response.message);
    }
    return;
  }

  const dict = {
    sent: response.result.sent,
    received: response.result.received,
  };
  reactsDict.set(dict);
}
