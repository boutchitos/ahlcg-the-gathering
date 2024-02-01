<script lang="ts">
  import type { BinderAs2Pages } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import PocketSheet from './PocketSheet.svelte';

  export let binder: BinderAs2Pages;

  let currentPage = binder.currentPage;
  let howManyPages = binder.howManyPages;
  let leftPage = binder.leftPage;
  let rightPage = binder.rightPage;
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
