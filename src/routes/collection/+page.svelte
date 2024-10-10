<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import { SortPlayerCardsDirectivesConfig } from './SortPlayerCardsDirectivesConfig';

  const { binder } = userBrowsesItsCollection(new SortPlayerCardsDirectivesConfig());
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder {binder} />
