<script lang="ts">
  import { userEditsCollection } from '$lib/userEditsCollection/userEditsCollection';
  import PacksBundle from './PacksBundle/PacksBundle.svelte';

  const { packsStore } = userEditsCollection();
  const title = 'Arkham Horror: The Card Game';

  $: packs = $packsStore;
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="mt-4 flex flex-wrap gap-5">
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
  <PacksBundle {packs} {title} />
</div>
