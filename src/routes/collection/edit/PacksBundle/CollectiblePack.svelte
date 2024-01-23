<script lang="ts">
  import type { CardsPack } from '$lib/userEditsCollection/userEditsCollectionBundle';

  import ArrowUp from './arrow-up.svg.svelte';
  import ArrowDown from './arrow-down.svg.svelte';
  import { derived } from 'svelte/store';

  export let pack: CardsPack;

  let howMany = pack.howMany;
  $: owned = derived(howMany, (value) => value > 0);
</script>

<div class="flex">
  <div class="grid gap-2">
    <button on:click={pack.addPackToCollection}>
      <ArrowUp class="h-4 text-gray-800 dark:text-white"></ArrowUp>
    </button>
    <button on:click={pack.removePackFromCollection}>
      <ArrowDown class="h-4 text-gray-800 dark:text-white"></ArrowDown>
    </button>
  </div>
  <span class={$owned === true ? 'bg-blue-400' : ''}>{$howMany}x {pack.name}</span>
</div>
