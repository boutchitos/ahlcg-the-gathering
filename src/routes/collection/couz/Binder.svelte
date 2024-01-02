<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';
  import type { Pocket as PocketViewModel } from './pocket';
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
    return pockets.slice(base, base + 9).map(toPocketViewModel);
  }

  function toPocketViewModel(pocket: Pocket): PocketViewModel {
    const coverCard = pocket.cards[0];
    return {
      title: coverCard.name,
      coverImage: {
        landscape: coverCard.type_code === 'investigator',
        url: `https://arkhamdb.com${coverCard.imagesrc}`,
      },
    };
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
