<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';

  const isBrowser = typeof window !== 'undefined';

  const { binder, classes, slots } = userBrowsesItsCollection();

  isBrowser && localStorage.classes && classes.set(JSON.parse(localStorage.classes));
  $: isBrowser && (localStorage.classes = JSON.stringify($classes));

  isBrowser &&
    localStorage.slots &&
    slots.set(JSON.parse(localStorage.slots).map((s: string) => s ?? undefined));
  $: isBrowser && (localStorage.slots = JSON.stringify($slots));
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<SortableClasses {classes} />
<SortableSlots {slots} />

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
