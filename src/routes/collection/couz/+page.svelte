<script lang="ts">
  // import Binder from '$lib/Components/Binder.svelte';
  // import { useBinder } from '$lib/Presenters/BinderOutputPort';

  import type { PageData } from './$types';

  import { useCollectionEditor } from '$lib/userEditsCollection/userEditsCollection';

  export let data: PageData;

  const { packsStore } = useCollectionEditor();

  // const binder = useBinder(data.pockets);
</script>

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<!-- <div class="mx-auto flex justify-center">
  <Binder {binder} />
</div> -->

<ul>
  {#each $packsStore as pack}
    <li>{pack}</li>
  {/each}
  <li></li>
</ul>
