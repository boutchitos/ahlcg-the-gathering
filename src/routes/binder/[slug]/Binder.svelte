<script lang="ts">
  import PocketSheet from './PocketSheet.svelte';
  import type { BinderAs2Pages } from './userBrowsesItsBinder';

  export let binder: BinderAs2Pages;

  $: currentPage = binder.currentPage;
  $: howManyPages = binder.howManyPages;
  $: leftPage = binder.leftPage;
  $: rightPage = binder.rightPage;
</script>

<div class="block">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={() => binder.handleLeftPageClick()}>
      <PocketSheet pockets={$leftPage.pockets} />
    </button>
    <button on:click={() => binder.handleRightPageClick()}>
      <PocketSheet pockets={$rightPage.pockets} />
    </button>
  </div>

  <h3 class="text-xl font-bold">
    {$currentPage}-{$currentPage + 1} of {$howManyPages} pages
  </h3>
</div>
