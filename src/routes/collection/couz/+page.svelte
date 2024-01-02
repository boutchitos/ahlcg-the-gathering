<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  import type { PageData } from './$types';
  import type { Pocket as PocketViewModel } from './pocket';
  import Binder from './Binder.svelte';

  export let data: PageData;

  $: pockets = toPockets(data);

  function toPockets(data: PageData) {
    return data.pockets.map(toPocketViewModel);
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
  <Binder {pockets} />
</div>
