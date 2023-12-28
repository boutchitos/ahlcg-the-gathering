<script lang="ts">
  import type { PageData } from './$types';
  import PocketSheet from './PocketSheet.svelte';

  export let data: PageData;

  let pocketOffset = 0;

  $: currentPage = Math.ceil(pocketOffset / 9) + 1;
  $: howManyPages = Math.ceil(data.pockets.length / 9);

  function gotoToNextpage() {
    pocketOffset += 18;
  }

  function gotoPreviousPage() {
    pocketOffset -= 18;
    pocketOffset = pocketOffset < 0 ? 0 : pocketOffset;
  }
</script>

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<h2 class="text-2xl font-bold">Showing {currentPage}-{currentPage + 1} of {howManyPages} pages</h2>

<!-- un binder, list of PocketSheet/ front-back avec un pager-->
<div class="mx-auto flex justify-center">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={gotoPreviousPage}>
      <PocketSheet pockets={data.pockets.slice(pocketOffset, pocketOffset + 9)} />
    </button>
    <button on:click={gotoToNextpage}>
      <PocketSheet pockets={data.pockets.slice(pocketOffset + 9, pocketOffset + 9 + 9)} />
    </button>
  </div>
</div>
