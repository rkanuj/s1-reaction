<script lang="ts">
  import { smileyDict } from '@/store';

  export let reacts: Reaction[];
  export let reactsOffline: ReactionOffline[];
  export let fromUser = false;
</script>

<div
    class="reacts"
    class:offline={!!import.meta.env.VITE_OFFLINE}
>
  {#if import.meta.env.VITE_OFFLINE}
    {#each reactsOffline as react (react.smiley)}
      <div class="react">
        <img src={$smileyDict[react.smiley]} alt={react.smiley}/>
        {#if react.remark}
          <span>{react.remark}</span>
        {/if}
        {#if fromUser}
          <a href={`forum.php?mod=redirect&goto=findpost&pid=${react.pid}`} target="_blank">#</a>
        {/if}
        <slot name="actionButton" {react}/>
      </div>
    {/each}
  {:else}
    {#each reacts as react (react.smiley)}
      <div class="react">
        <img src={$smileyDict[react.smiley]} alt={react.smiley}/>
        <span>+{react.count}</span>
        <slot name="actionButton" {react}/>
      </div>
    {/each}
  {/if}
  <slot name="addButton"/>
</div>

<style lang="scss">
  @use "../styles/vars";

  .reacts {
    font-size: 14px;
    display: grid;
    height: 62px;
    padding: 4px;
    border: vars.$border-dashed;
    grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));

    &.offline {
      display: flex;
      flex-wrap: wrap;

      .react {
        flex-direction: row;
      }
    }

    .react {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 4px;

      img {
        width: 32px
      }
    }
  }
</style>
