<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';

  const binder = userBrowsesItsCollection();
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
