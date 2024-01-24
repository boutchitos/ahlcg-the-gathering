<script lang="ts">
  import { userEditsItsCollection } from '$lib/userEditsItsCollection/userEditsItsCollection';
  import PacksBundle from './PacksBundle/PacksBundle.svelte';

  const { allAvailableBundles } = userEditsItsCollection();
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="mt-4 flex flex-wrap gap-5">
  {#each allAvailableBundles as { packs, title }}
    <PacksBundle {packs} {title} />
  {/each}
</div>
