<script lang="ts">
  import { useCollectionEditor } from '$lib/userEditsCollection/userEditsCollection';
  import PacksBundle from './PacksBundle/PacksBundle.svelte';

  const { packsStore } = useCollectionEditor();
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="grid gap-4">
  <PacksBundle title="Arkham Horror: The Card Game" packs={$packsStore} />
  <PacksBundle title="Arkham Horror: The Card Game" packs={$packsStore} />
</div>
