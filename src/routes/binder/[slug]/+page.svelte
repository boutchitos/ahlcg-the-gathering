<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';
  import Binder from './Binder.svelte';

  const { binder } = userBrowsesItsCollection(new SortPlayerCardsDirectivesConfig());
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder {binder} />
