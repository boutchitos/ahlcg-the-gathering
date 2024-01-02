<script lang="ts">
  import type { PageData } from './$types';
  import type { Pocket } from '$lib/BinderStorage';
  import type { Pocket as PocketViewModel } from './pocket';
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

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<h2 class="text-2xl font-bold">Showing {currentPage}-{currentPage + 1} of {howManyPages} pages</h2>

<!-- un binder, list of PocketSheet/ front-back avec un pager-->
<div class="mx-auto flex justify-center">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={gotoPreviousPage}>
      <PocketSheet
        pockets={data.pockets.slice(pocketOffset, pocketOffset + 9).map(toPocketViewModel)}
      />
    </button>
    <button on:click={gotoToNextpage}>
      <PocketSheet
        pockets={data.pockets.slice(pocketOffset + 9, pocketOffset + 9 + 9).map(toPocketViewModel)}
      />
    </button>
  </div>
</div>
