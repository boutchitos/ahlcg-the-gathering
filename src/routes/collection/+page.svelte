<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';

  const isBrowser = typeof window !== 'undefined';

  const { binder, classes } = userBrowsesItsCollection();

  isBrowser && localStorage.classes && classes.set(JSON.parse(localStorage.classes));
  $: isBrowser && (localStorage.classes = JSON.stringify($classes));
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<SortableClasses {classes} />

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
