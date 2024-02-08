<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import SortablePlayerCardTypes from '$lib/SortablePlayerCardTypes/SortablePlayerCardTypes.svelte';

  const isBrowser = typeof window !== 'undefined';

  const { binder, classes, playerCardTypes, slots, sortingOrder } = userBrowsesItsCollection();

  isBrowser && localStorage.classes && classes.set(JSON.parse(localStorage.classes));
  $: isBrowser && (localStorage.classes = JSON.stringify($classes));

  isBrowser &&
    localStorage.slots &&
    slots.set(JSON.parse(localStorage.slots).map((s: string) => s ?? undefined));
  $: isBrowser && (localStorage.slots = JSON.stringify($slots));

  isBrowser &&
    localStorage.playerCardTypes &&
    playerCardTypes.set(
      JSON.parse(localStorage.playerCardTypes).map((s: string) => s ?? undefined),
    );
  $: isBrowser && (localStorage.playerCardTypes = JSON.stringify($playerCardTypes));

  isBrowser &&
    localStorage.sortingOrder &&
    sortingOrder.set(JSON.parse(localStorage.sortingOrder).map((s: string) => s ?? undefined));
  $: isBrowser && (localStorage.sortingOrder = JSON.stringify($sortingOrder));
</script>

<h1 class="text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<SortableCriterias items={sortingOrder} let:item>
  {#if item === 'by-classes'}
    <SortableClasses {classes} />
  {:else if item === 'by-player-card-types'}
    <SortablePlayerCardTypes {playerCardTypes} />
  {/if}
</SortableCriterias>
<SortableSlots {slots} />
<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
