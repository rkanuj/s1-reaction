<script lang="ts">
  import { needLogin, selectedPost, showModal } from '@/store';

  let dialog: HTMLDialogElement;

  $: if (dialog) {
    if ($showModal) {
      document.body.style.overflow = 'hidden';
      dialog.show();
    } else {
      document.body.style.overflow = '';
      dialog.close();
      $selectedPost = null;
    }
  }

  // for HMR to keep the dialog open, stripped in production
  $: if (import.meta.env.DEV && dialog && $showModal) {
    dialog.show();
  }

  const onCloseBtnClick = () => {
    $showModal = false;
  };

  const onBackdropClick = () => {
    $showModal = false;
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    class="modal-dialog"
    class:offline={!!import.meta.env.VITE_OFFLINE}
    class:only-login-form={!import.meta.env.VITE_OFFLINE && $needLogin}
>
  <div class="dialog-header">
    <div class="dialog-title">S1 Reaction</div>
    <button class="close-btn" on:click={onCloseBtnClick}>×</button>
  </div>
  <div class="dialog-content">
    <slot/>
  </div>
</dialog>
{#if $showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="modal-backdrop" on:click={onBackdropClick}/>
{/if}

<style lang="scss">
  @use "../styles/vars";

  $z-index: 1000;

  .modal-dialog {
    position: fixed;
    z-index: $z-index + 1;
    top: 50%;
    left: 50%;
    overflow: auto;
    margin: 0;
    padding: 0;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 20px dimgray;

    &.only-login-form {
      width: 270px;
    }

    &:not(.only-login-form) {
      width: 500px;
      height: 80vh;
      max-height: 580px;
    }

    &.offline {
      max-height: 350px
    }

    .dialog-header {
      position: sticky;
      top: 0;
      align-content: center;
      height: 40px;
      padding: 0 12px;
      border-bottom: 1px solid lightgray;
      background-color: white;

      .dialog-title {
        font-size: 16px;
      }

      .close-btn {
        @include vars.clear-btn;
        font-size: 24px;
        position: absolute;
        top: 0;
        right: 16px;
        transition: color 0.3s ease;
        color: gray;

        &:hover {
          color: black;
        }
      }
    }

    .dialog-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 12px;
    }
  }

  .modal-backdrop {
    position: fixed;
    z-index: $z-index;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
