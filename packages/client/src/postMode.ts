import { reactApi } from '@/api';
import type { PostQueryPostReacts200Response } from '@/api/gen';
import Modal from '@/components/Modal.svelte';
import PostReacts from '@/components/PostReacts.svelte';
import { reactsDict, selectedUserInfo } from '@/store';
import { extractId, justAlert, justLogError } from '@/utils';
import { responseErrorHandle } from 'shared';
import { get } from 'svelte/store';

export async function postMode() {
  const postDataList: {
    pid: number,
    uid: number,
    target: HTMLElement
  }[] = [];

  const postElements = document.querySelectorAll<HTMLTableElement>('table[id^=pid]');
  postElements.forEach((postElement) => {
    const pid = extractId(postElement.id, /^pid(\d+)$/);
    if (pid === null) {
      return;
    }

    const userLinkElement = postElement.querySelector<HTMLLinkElement>('a[href^=space-uid-]');
    if (!userLinkElement) {
      return;
    }
    const uid = extractId(userLinkElement.getAttribute('href') || '', /^space-uid-(\d+)\.html$/);
    if (uid === null) {
      return;
    }

    const positionElement = postElement.querySelector<HTMLTableRowElement>(`tr[id=_postposition${ pid }]`);
    if (!positionElement) {
      return;
    }

    const avatarElement = postElement.querySelector<HTMLTableCellElement>('td.pls[rowspan="2"]');
    if (!avatarElement) {
      return;
    }
    avatarElement.setAttribute('rowspan', '3');

    const containerElement = document.createElement('tr');
    containerElement.classList.add('s1-reaction');
    containerElement.classList.add('s1-reaction-post');
    containerElement.setAttribute('data-id', String(pid));

    const mountElement = document.createElement('td');
    mountElement.classList.add('plc');
    mountElement.classList.add('plm');
    containerElement.append(mountElement);

    positionElement.before(containerElement);

    postDataList.push({
      pid,
      uid,
      target: mountElement,
    });
  });

  if (postDataList.length === 0) {
    return;
  }

  postDataList.forEach(data => {
    new PostReacts({
      target: data.target,
      props: {
        pid: data.pid,
        uid: data.uid,
      },
    });
  });
  new Modal({
    target: document.body,
  });

  const response = await reactApi.postQueryPostReacts({
    postQueryPostReactsRequest: {
      pids: postDataList.map(item => item.pid),
      auth: get(selectedUserInfo)?.auth,
    },
  }).catch(responseErrorHandle<PostQueryPostReacts200Response>);

  if (!response.success) {
    justAlert('获取帖子回应失败');
    if (response.message) {
      justLogError(response.message);
    }
    return;
  }

  const dict: Record<string, Reaction[]> = {};
  response.result.forEach(result => {
    dict[`pid${ result.pid }`] = result.reacts.map(react => {
      return {
        smiley: react.smiley,
        count: react.count,
        reacted: react.reacted > 0,
      };
    });
  });
  reactsDict.set(dict);
}
