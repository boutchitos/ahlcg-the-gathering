<script lang="ts">
  import type {
    BinderAs2Pages,
    PocketViewModel,
  } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import PocketSheet from './PocketSheet.svelte';

  export let binder: BinderAs2Pages;

  let currentPage = binder.currentPage;
  let howManyPages = binder.howManyPages;
  let leftPockets: PocketViewModel[];
  let rightPockets: PocketViewModel[];
  binder.leftPage.subscribe((page) => (leftPockets = page.pockets));
  binder.rightPage.subscribe((page) => (rightPockets = page.pockets));
</script>

<div class="block">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={() => binder.handleLeftPageClick()}>
      <PocketSheet pockets={leftPockets} />
    </button>
    <button on:click={() => binder.handleRightPageClick()}>
      <PocketSheet pockets={rightPockets} />
    </button>
  </div>

  <h3 class="text-xl font-bold">
    {$currentPage}-{$currentPage + 1} of {$howManyPages} pages
  </h3>
</div>
