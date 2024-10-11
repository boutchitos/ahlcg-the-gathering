<script lang="ts">
  import type { BinderAs2Pages } from '../../collection/organize/userOrganizeItsCollection';
  import PocketSheet from './PocketSheet.svelte';

  export let binder: BinderAs2Pages;

  const { currentPage, howManyPages, leftPage, rightPage } = binder;
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
