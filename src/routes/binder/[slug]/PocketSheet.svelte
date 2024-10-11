<script lang="ts">
  import Pocket from './Pocket.svelte';
  import type { PocketViewModel } from './userBrowsesItsBinder';

  export let pockets: PocketViewModel[];
</script>

<div class="grid grid-cols-3 grid-rows-3 gap-2 bg-gray-700 p-2">
  {#each pockets as pocket}
    <Pocket {pocket} />
  {/each}
</div>
