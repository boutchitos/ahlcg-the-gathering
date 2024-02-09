<script lang="ts">
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import Binder from './Binder.svelte';
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import SortablePlayerCardTypes from '$lib/SortablePlayerCardTypes/SortablePlayerCardTypes.svelte';
  import { SortPlayerCardsDirectivesConfig } from './SortPlayerCardsDirectivesConfig';

  const { binder, classes, playerCardTypes, slots, sortingOrder } = userBrowsesItsCollection(
    new SortPlayerCardsDirectivesConfig(),
  );
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
