<script lang="ts">
  import PocketSheet from './PocketSheet.svelte';
  import type { Binder, BinderPage, Pocket } from '$lib/Presenters/binder';

  export let binder: Binder;

  let leftPockets: Pocket[];
  let rightPockets: Pocket[];
  let currentPage = binder.currentPage;
  let howManyPages = binder.howManyPages;
  binder.leftPage.subscribe((page: BinderPage) => (leftPockets = page.pockets));
  binder.rightPage.subscribe((page: BinderPage) => (rightPockets = page.pockets));
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
