<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import { writable } from 'svelte/store';

  const isBrowser = typeof window !== 'undefined';

  const { binder, classes, slots } = userBrowsesItsCollection();

  isBrowser && localStorage.classes && classes.set(JSON.parse(localStorage.classes));
  $: isBrowser && (localStorage.classes = JSON.stringify($classes));

  isBrowser &&
    localStorage.slots &&
    slots.set(JSON.parse(localStorage.slots).map((s: string) => s ?? undefined));
  $: isBrowser && (localStorage.slots = JSON.stringify($slots));

  const criterias = writable(['classes', 'slots']);
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<SortableCriterias items={criterias} let:item>
  {#if item === 'classes'}
    <SortableClasses {classes} />
  {:else if item === 'slots'}
    <SortableSlots {slots} />
  {/if}
</SortableCriterias>
<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
