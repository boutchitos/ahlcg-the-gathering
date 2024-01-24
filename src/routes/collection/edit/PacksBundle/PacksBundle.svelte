<script lang="ts">
  import type { CardsPack } from '$lib/userEditsItsCollection/userEditsItsCollection';
  import CollectiblePack from './CollectiblePack.svelte';

  export let title: string;
  export let packs: CardsPack[];
</script>

<div class="w-80">
  <h3 class=" bg-gray-300">{title}</h3>
  <div class="ml-5">
    {#each packs as pack}
      <CollectiblePack {pack} />
    {/each}
  </div>
</div>
