<script lang="ts">
  import type { Collection } from '$gathering/Collection';
  import type { ICollectionOutput } from '$gathering/ICollectionOutput';
  import { userEditsItsCollection } from '$lib/userEditsItsCollection/userEditsItsCollection';
  import PacksBundle from './PacksBundle/PacksBundle.svelte';

  const isBrowser = typeof window !== 'undefined';

  class SaveLocalStorage implements ICollectionOutput {
    collectionUpdated(collection: Collection): void {
      if (!isBrowser) {
        return;
      }
      localStorage.collection = JSON.stringify(collection);
    }
  }

  const { allAvailableBundles } = userEditsItsCollection(new SaveLocalStorage());
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="mt-4 flex flex-wrap gap-5">
  {#each allAvailableBundles as { packs, title }}
    <PacksBundle {packs} {title} />
  {/each}
</div>
