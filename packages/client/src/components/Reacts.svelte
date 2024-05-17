<script lang="ts">
  import { smileyDict } from '@/store';

  export let reacts: Reaction[];
</script>

<div class="reacts">
  {#each reacts as react (react.smiley)}
    <div class="react">
      <img src={$smileyDict[react.smiley]} alt={react.smiley}/>
      <span>+{react.count}</span>
      <slot name="actionButton" {react}/>
    </div>
  {/each}
  <slot name="addButton"/>
</div>

<style lang="scss">
  @use "../styles/vars";

  .reacts {
    font-size: 14px;
    display: grid;
    padding: 4px 8px 0 0;
    border: vars.$border-dashed;
    grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));

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
