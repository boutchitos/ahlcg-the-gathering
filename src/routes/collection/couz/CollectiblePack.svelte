<script lang="ts">
  import type { Pack } from '$lib/userEditsCollection/userEditsCollection';

  import ArrowUp from './arrow-up.svg.svelte';
  import ArrowDown from './arrow-down.svg.svelte';

  export let pack: Pack;
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
  <span class={pack.owned === true ? 'bg-blue-400' : ''}>{pack.howMany}x {pack.name}</span>
</div>
