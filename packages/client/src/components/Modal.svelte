<script lang="ts">
  import Login from '@/components/Login.svelte';
  import ModalDialog from '@/components/ModalDialog.svelte';
  import Smiles from '@/components/Smiles.svelte';
  import UserInfo from '@/components/UserInfo.svelte';
  import { needLogin } from '@/store';
</script>

<div class="modal">
  <ModalDialog>
    {#if import.meta.env.VITE_OFFLINE}
      <Smiles/>
    {:else}
      {#if !$needLogin}
        <Smiles/>
      {/if}
      <Login/>
      {#if !$needLogin}
        <UserInfo/>
      {/if}
    {/if}
  </ModalDialog>
</div>

<style lang="scss">
  .modal {
    :global {
      .dialog-content > *:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
</style>
