<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';
  import type { PageData } from './$types';
  import type { Binder as BinderViewModel, BinderPage, Pocket as PocketViewModel } from './binder';

  import Binder from './Binder.svelte';

  export let data: PageData;

  let binder: BinderViewModel;
  let pocketOffset = 0;

  $: pockets = data.pockets.map(toPocketViewModel);
  $: binder = {
    currentPage: Math.ceil(pocketOffset / 9) + 1,
    howManyPages: Math.ceil(pockets.length / 9),
    leftPage: getPockets(pockets, 0),
    rightPage: getPockets(pockets, 9),
    handleLeftPageClick: () => {
      pocketOffset -= 18;
      pocketOffset = pocketOffset < 0 ? 0 : pocketOffset;
    },
    handleRightPageClick: () => {
      pocketOffset += 18;
    },
  };

  function getPockets(pockets: PocketViewModel[], offset: number): BinderPage {
    const base = pocketOffset + offset;
    return { pockets: pockets.slice(base, base + 9) };
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

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
