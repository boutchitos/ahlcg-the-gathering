<script lang="ts">
  import { useCollectionEditor } from '$lib/userEditsCollection/userEditsCollection';
  import PacksBundle from './PacksBundle/PacksBundle.svelte';

  const { packsStore } = useCollectionEditor();
  const title = 'Arkham Horror: The Card Game';
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="mt-4 flex flex-wrap gap-5">
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
  <PacksBundle packs={$packsStore} {title} />
</div>
