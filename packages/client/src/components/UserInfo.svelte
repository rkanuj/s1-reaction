<script lang="ts">
  import { selectedUID, userInfoDict, userInfoList } from '@/store';
  import { currentTimestamp, deepCopy, formatTimestamp } from 'shared';

  const onRemoveBtnClick = (uid: number) => {
    if (import.meta.env.VITE_OFFLINE) {
      return;
    }

    userInfoDict.update(dict => {
      const newDict = deepCopy(dict);
      delete newDict[uid];
      if (uid === $selectedUID) {
        const values = Object.values(newDict);
        $selectedUID = values.length > 0 ? values[0].uid : null;
      }
      return newDict;
    });
  };
</script>

{#if !import.meta.env.VITE_OFFLINE}
  <div class="user-info">
    {#each $userInfoList as userInfo}
      <div class="user">
        <div>
          {#if $userInfoList.length > 1}
            <input type="radio" bind:group={$selectedUID} value={userInfo.uid}/>
          {/if}
          <span>{userInfo.username} (UID: {userInfo.uid})</span>
          <button class="remove-user-btn" on:click={() => {onRemoveBtnClick(userInfo.uid)}}>×</button>
        </div>
        <div>
          <code class="token">{userInfo.auth.token.substring(0, 7)}</code> |
          <div class="date">
            <span>{formatTimestamp(userInfo.auth.payload.iat, true)}</span>
            {#if userInfo.auth.payload.exp > 0}
              {@const expiredAt = userInfo.auth.payload.iat + userInfo.auth.payload.exp}
              | <span class:expired={currentTimestamp() > expiredAt}>{formatTimestamp(expiredAt, true)}</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
    {#if $userInfoList.length > 1}
      <span class="tips">切换账号后建议手动刷新页面</span>
    {/if}
  </div>
{/if}

<style lang="scss">
  @use "../styles/vars";

  .user-info {
    font-size: 14px;
    width: 100%;

    .user {
      &:not(:last-child) {
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: vars.$border-dashed;
      }

      > *:not(:last-child) {
        margin-bottom: 8px;
      }

      .remove-user-btn {
        @include vars.clear-btn;
        font-weight: bold;
        transition: color 0.3s ease;
        color: orangered;

        &:hover {
          color: darkred;
        }
      }

      .token {
        color: dimgray;
      }

      .date {
        display: inline;

        > * {
          color: green;

          &.expired {
            color: red;
          }
        }
      }
    }

    .tips {
      font-size: 0.8em;
      color: dimgray;
    }
  }
</style>
