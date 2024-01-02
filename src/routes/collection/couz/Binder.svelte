<script lang="ts">
  import type { Pocket } from './pocket';
  import PocketSheet from './PocketSheet.svelte';

  export let pockets: Pocket[];

  let pocketOffset = 0;

  $: currentPage = Math.ceil(pocketOffset / 9) + 1;
  $: howManyPages = Math.ceil(pockets.length / 9);
  $: leftPockets = getPockets(pockets, pocketOffset);
  $: rightPockets = getPockets(pockets, pocketOffset, 9);

  function gotoToNextPage() {
    pocketOffset += 18;
  }

  function gotoPreviousPage() {
    pocketOffset -= 18;
    pocketOffset = pocketOffset < 0 ? 0 : pocketOffset;
  }

  function getPockets(pockets: Pocket[], pocketOffset: number, offset = 0) {
    const base = pocketOffset + offset;
    return pockets.slice(base, base + 9);
  }
</script>

<div class="block">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={gotoPreviousPage}>
      <PocketSheet pockets={leftPockets} />
    </button>
    <button on:click={gotoToNextPage}>
      <PocketSheet pockets={rightPockets} />
    </button>
  </div>

  <h3 class="text-xl font-bold">{currentPage}-{currentPage + 1} of {howManyPages} pages</h3>
</div>
