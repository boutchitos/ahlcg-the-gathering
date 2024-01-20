<script lang="ts">
  // import Binder from '$lib/Components/Binder.svelte';
  import ArrowUp from './arrow-up.svg.svelte';
  import ArrowDown from './arrow-down.svg.svelte';
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
    <li>
      <div class="flex">
        <div class="grid gap-2">
          <button on:click={pack.addPackToCollection}>
            <ArrowUp class="h-4 text-gray-800 dark:text-white"></ArrowUp>
          </button>
          <button on:click={pack.removePackFromCollection}>
            <ArrowDown class="h-4 text-gray-800 dark:text-white"></ArrowDown>
          </button>
        </div>
        <span class={pack.owned === true ? 'bg-blue-400' : ''}>{pack.howMany}x {pack.name}</span>
      </div>
    </li>
  {/each}
  <li></li>
</ul>
