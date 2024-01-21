<script lang="ts">
  import type { PageData } from './$types';

  import Binder from '$lib/Components/Binder.svelte';
  import { useBinder } from '$lib/Presenters/BinderOutputPort';

  import CollectiblePack from './CollectiblePack.svelte';
  import { useCollectionEditor } from '$lib/userEditsCollection/userEditsCollection';

  export let data: PageData;

  const { packsStore } = useCollectionEditor();

  const binder = useBinder(data.pockets);
</script>

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<ul>
  {#each $packsStore as pack}
    <li>
      <CollectiblePack {pack} />
    </li>
  {/each}
  <li></li>
</ul>

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
