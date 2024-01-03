<script lang="ts">
  import PocketSheet from './PocketSheet.svelte';
  import type { Binder } from './binder';

  export let binder: Binder;
</script>

<div class="block">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={() => binder.handleLeftPageClick()}>
      <PocketSheet pockets={binder.leftPage.pockets} />
    </button>
    <button on:click={() => binder.handleRightPageClick()}>
      <PocketSheet pockets={binder.rightPage.pockets} />
    </button>
  </div>

  <h3 class="text-xl font-bold">
    {binder.currentPage}-{binder.currentPage + 1} of {binder.howManyPages} pages
  </h3>
</div>
