<script lang="ts">
  import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';
  import { userBrowsesItsBinder } from './userBrowsesItsBinder';
  import Binder from './Binder.svelte';

  const { binder } = userBrowsesItsBinder(new SortPlayerCardsDirectivesConfig());
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder {binder} />
