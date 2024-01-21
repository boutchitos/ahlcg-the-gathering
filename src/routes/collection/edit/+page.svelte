<script lang="ts">
  import CollectiblePack from './CollectiblePack.svelte';
  import { useCollectionEditor } from '$lib/userEditsCollection/userEditsCollection';

  const { packsStore } = useCollectionEditor();
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<ul>
  {#each $packsStore as pack}
    <li>
      <CollectiblePack {pack} />
    </li>
  {/each}
  <li></li>
</ul>
