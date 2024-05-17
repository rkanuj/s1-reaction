<script lang="ts">
  import { reactApiUpdatePostReact } from '@/api';
  import Reacts from '@/components/Reacts.svelte';
  import { reactsDict, selectedPost, selectedUserInfo, showModal, smileyDict } from '@/store';
  import { justAlert, sortReacts } from '@/utils';

  export let pid: number;
  export let uid: number;

  let reacts: Reaction[] = [];

  $: {
    const postReacts = $reactsDict[`pid${ pid }`];
    if (!postReacts) {
      reacts = [];
    } else {
      reacts = sortReacts(postReacts);
    }
  }

  const onAddBtnClick = () => {
    $showModal = true;
    $selectedPost = {
      pid,
      uid,
    };
  };

  const onRemoveBtnClick = async () => {
    if (!$selectedUserInfo) {
      justAlert('请先选择账号');
      return;
    }
    await reactApiUpdatePostReact({ pid, uid }, null, $selectedUserInfo);
  };

  const onPlusBtnClick = async (smiley: string) => {
    if (!$selectedUserInfo) {
      justAlert('请先选择账号');
      return;
    }
    await reactApiUpdatePostReact({ pid, uid }, smiley, $selectedUserInfo);
  };
</script>

<div class="post-reacts">
  <Reacts {reacts}>
    <svelte:fragment let:react slot="actionButton">
      {#if $selectedUserInfo}
        {#if react.reacted}
          <button class="action-btn remove-react-btn" on:click={onRemoveBtnClick}>×</button>
        {:else}
          <button class="action-btn plus-react-btn" on:click={() => {onPlusBtnClick(react.smiley)}}>+</button>
        {/if}
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="addButton">
      <div class="add-react">
        <button class="add-react-btn" on:click={onAddBtnClick}>
          <img alt="+1" src={$smileyDict['[f:253]']}>
        </button>
      </div>
    </svelte:fragment>
  </Reacts>
</div>

<style lang="scss">
  @use "../styles/vars";

  :global {
    table.plhin {
      .po.hin {
        border-top: none;
      }
    }
  }

  .post-reacts {
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

      &.plus-react-btn {
        color: limegreen;

        &:hover {
          color: darkgreen;
        }
      }
    }

    .add-react {
      position: relative;
      align-content: center;
      padding: 8px;

      .add-react-btn {
        @include vars.clear-btn;
        width: 100%;
        padding: 4px;
        transition: background-color 0.3s ease;
        border-radius: 8px;
        background-color: #d1d9c1;

        &:hover {
          background-color: #c2cdb5;
        }

        &:active {
          background-color: #c3c5ae;
        }
      }
    }
  }
</style>
