<script lang="ts">
  import { reactApiOfflineUpdatePostReacts } from '@/api';
  import Reacts from '@/components/Reacts.svelte';
  import { reactsDict, reactsOfflineDict } from '@/store';
  import { sortReacts } from '@/utils';

  let sentReacts: Reaction[] = [];
  let receivedReacts: Reaction[] = [];
  let receivedReactsOffline: ReactionOffline[] = [];

  $: if (!import.meta.env.VITE_OFFLINE) {
    const userSentReacts = $reactsDict.sent;
    if (!userSentReacts) {
      sentReacts = [];
    } else {
      sentReacts = sortReacts(userSentReacts);
    }
  }

  $: if (!import.meta.env.VITE_OFFLINE) {
    const userReceivedReacts = $reactsDict.received;
    if (!userReceivedReacts) {
      receivedReacts = [];
    } else {
      receivedReacts = sortReacts(userReceivedReacts);
    }
  }

  $: if (import.meta.env.VITE_OFFLINE) {
    const userReceivedReacts = $reactsOfflineDict.received;
    receivedReactsOffline = userReceivedReacts || [];
  }

  const onRemoveBtnClick = (react: Reaction | ReactionOffline) => {
    if (!import.meta.env.VITE_OFFLINE) {
      return;
    }
    const { pid, uid2 } = react as ReactionOffline;
    reactApiOfflineUpdatePostReacts({ pid, uid2 }, null, '', true);
  };
</script>

{#if import.meta.env.VITE_OFFLINE}
  {#if receivedReactsOffline.length > 0 }
    <div class="user-reacts">
      <h2 class="mbn">收到回应及标记</h2>
      <Reacts reacts={receivedReacts} reactsOffline={receivedReactsOffline} fromUser={true}>
        <svelte:fragment let:react slot="actionButton">
          <button class="action-btn remove-react-btn" on:click={() => {onRemoveBtnClick(react)}}>×</button>
        </svelte:fragment>
      </Reacts>
    </div>
  {/if}
{:else}
  {#if receivedReacts.length > 0 || sentReacts.length > 0}
    <div class="user-reacts">
      {#if receivedReacts.length > 0}
        <h2 class="mbn">收到回应</h2>
        <Reacts reacts={receivedReacts} reactsOffline={[]}/>
      {/if}
      {#if sentReacts.length > 0}
        <h2 class="mbn">送出回应</h2>
        <Reacts reacts={sentReacts} reactsOffline={[]}/>
      {/if}
    </div>
  {/if}
{/if}

<style lang="scss">
  @use "../styles/vars";

  .user-reacts {
    margin-top: 8px;
    border-top: vars.$border-dashed;

    .action-btn {
      @include vars.clear-btn;
      font-weight: bold;
      position: absolute;
      top: 0;
      right: 0;
      transition: color 0.3s ease;

      &.remove-react-btn {
        color: orangered;

        &:hover {
          color: darkred;
        }
      }
    }

    .mbn {
      margin-top: 8px;
      margin-bottom: 8px !important;
    }
  }
</style>
