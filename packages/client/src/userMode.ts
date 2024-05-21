import API from '@/api';
import type { PostQueryUserReacts200Response } from '@/api/gen';
import UserReacts from '@/components/UserReacts.svelte';
import { reactsDict, reactsOfflineDict } from '@/store';
import { extractId, justAlert, justLogError } from '@/utils';
import { responseErrorHandle } from 'shared';

export async function userMode() {
  const uid2 = extractId(location.href, /\/space-uid-(\d+)\.html$/);
  if (uid2 === null) {
    return;
  }

  const positionElement = document.querySelector<HTMLDivElement>('div[id=psts]');
  if (!positionElement) {
    return;
  }

  const mountElement = document.createElement('div');
  mountElement.classList.add('s1-reaction');
  mountElement.classList.add('s1-reaction-user');
  mountElement.setAttribute('data-id', String(uid2));

  positionElement.parentElement!.append(mountElement);

  new UserReacts({
    target: mountElement,
  });

  if (import.meta.env.VITE_OFFLINE) {
    const result = API.reactApiOffline.postQueryUserReacts({
      uid2,
    });
    reactsOfflineDict.set({
      received: result,
    });
    return;
  }

  const response = await API.reactApi.postQueryUserReacts({
    postQueryUserReactsRequest: {
      uid2,
    },
  }).catch(responseErrorHandle<PostQueryUserReacts200Response>);

  if (!response.success) {
    justAlert('获取用户回应失败');
    if (response.message) {
      justLogError(response.message);
    }
    return;
  }

  reactsDict.set({
    sent: response.result.sent,
    received: response.result.received,
  });
}
