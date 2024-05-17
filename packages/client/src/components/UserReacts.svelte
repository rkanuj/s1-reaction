<script lang="ts">
  import Reacts from '@/components/Reacts.svelte';
  import { reactsDict } from '@/store';
  import { sortReacts } from '@/utils';

  let sentReacts: Reaction[] = [];
  let receivedReacts: Reaction[] = [];

  $: {
    const userSentReacts = $reactsDict.sent;
    if (!userSentReacts) {
      sentReacts = [];
    } else {
      sentReacts = sortReacts(userSentReacts);
    }
  }

  $:{
    const userReceivedReacts = $reactsDict.received;
    if (!userReceivedReacts) {
      receivedReacts = [];
    } else {
      receivedReacts = sortReacts(userReceivedReacts);
    }
  }
</script>

<div class="user-reacts">
  <h2 class="mbn">收到回应</h2>
  <Reacts reacts={receivedReacts}/>
  <h2 class="mbn">送出回应</h2>
  <Reacts reacts={sentReacts}/>
</div>

<style lang="scss">
  @use "../styles/vars";

  .user-reacts {
    margin-top: 8px;
    border-top: vars.$border-dashed;

    .mbn {
      margin-top: 8px;
      margin-bottom: 8px !important;
    }
  }
</style>
