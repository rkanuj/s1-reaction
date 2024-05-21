<script lang="ts">
  import { reactApiOfflineUpdatePostReacts, reactApiUpdatePostReact } from '@/api';
  import { selectedPost, selectedUserInfo, showModal, smilesTable } from '@/store';
  import { justAlert } from '@/utils';

  let activeTypeId = $smilesTable.length > 0 ? $smilesTable[0].typeid : null;
  let remark = '';

  const onSmileyClick = async (smiley: string) => {
    if (!$selectedPost) {
      justAlert('请先选择帖子');
      return;
    }

    const result = await (async () => {
      if (import.meta.env.VITE_OFFLINE) {
        return reactApiOfflineUpdatePostReacts($selectedPost, smiley, remark);
      }
      if (!$selectedUserInfo) {
        justAlert('请先选择账号');
        return false;
      }
      return await reactApiUpdatePostReact($selectedPost, smiley, $selectedUserInfo);
    })();

    if (result) {
      $showModal = false;
      remark = '';
    }
  };
</script>

<div class="smiles">
  {#if import.meta.env.VITE_OFFLINE}
    <input bind:value={remark} class="remark" placeholder="输入可选文本标记，然后点击表情一起保存" type="text"/>
  {/if}
  <div>
    {#each $smilesTable as smiles (smiles.typeid)}
      <button
          class="smiles-type-btn"
          class:active={activeTypeId === smiles.typeid}
          on:click={() => {activeTypeId = smiles.typeid}}
      >
        {smiles.type}
      </button>
    {/each}
  </div>
  <div class="smiles-table">
    {#each $smilesTable as smiles (smiles.typeid)}
      {#if activeTypeId === smiles.typeid}
        <table>
          {#each smiles.list as smilesRow}
            <tr>
              {#each smilesRow as smiley (smiley.code)}
                <td on:click={() => {onSmileyClick(smiley.code)}}>
                  <img src={smiley.url} alt={smiley.code}/>
                </td>
              {/each}
            </tr>
          {/each}
        </table>
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  @use "../styles/vars";

  .smiles {
    .remark {
      width: 100%;
      margin-bottom: 8px;
    }

    .smiles-type-btn {
      @include vars.clear-btn;
      padding: 4px;
      border-top: vars.$border-dashed;
      border-right: vars.$border-dashed;
      background-color: buttonface;

      &:first-child {
        border-left: vars.$border-dashed;
      }

      &.active {
        background-color: white;
      }
    }

    .smiles-table {
      overflow: auto;
      width: 440px;
      height: 40px * 5;
      border: vars.$border-dashed;

      td {
        padding: 2px;

        img {
          width: 32px;
        }
      }
    }
  }
</style>
