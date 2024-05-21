import Modal from '@/components/Modal.svelte';
import PostReacts from '@/components/PostReacts.svelte';
import UserReacts from '@/components/UserReacts.svelte';
import { postMode } from '@/postMode';
import { checkSmiles } from '@/smilesModule';
import { reactsDict } from '@/store';
import { userMode } from '@/userMode';
import { generateTestReacts } from '@/utils';

(async () => {
  if (!await checkSmiles()) {
    return;
  }

  if (import.meta.env.VITE_SKIP_S1) {
    const testPID = 10000;
    const testUID = 10000;

    const targetUser = document.createElement('div');
    document.body.insertBefore(targetUser, document.body.firstChild);
    const targetPost = document.createElement('div');
    document.body.insertBefore(targetPost, document.body.firstChild);

    new UserReacts({
      target: targetUser,
    });
    new PostReacts({
      target: targetPost,
      props: {
        pid: testPID,
        uid2: testUID,
      },
    });
    new Modal({
      target: document.body,
    });

    reactsDict.update(dict => {
      dict[`pid${ testPID }`] = generateTestReacts();
      dict.sent = generateTestReacts();
      dict.received = generateTestReacts();
      return dict;
    });

    return;
  }

  if (location.pathname.startsWith('/2b/space-uid-')) {
    await userMode();
  } else {
    await postMode();
  }
})();
