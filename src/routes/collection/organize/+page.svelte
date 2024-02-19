<script lang="ts">
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import SortablePlayerCardTypes from '$lib/SortablePlayerCardTypes/SortablePlayerCardTypes.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import { writable } from 'svelte/store';
  import { SortPlayerCardsDirectivesConfig } from '../SortPlayerCardsDirectivesConfig';

  const { classes, playerCardTypes, slots, sortingOrder } = userBrowsesItsCollection(
    new SortPlayerCardsDirectivesConfig(),
  );

  let groupIfSameTitle = writable(false);
  let groupOfAnyLevels = writable(false);
</script>

<SortableCriterias items={sortingOrder} let:item>
  {#if item === 'by-classes'}
    <SortableClasses {classes} />
  {:else if item === 'by-names'}
    <div>by names</div>
  {:else if item === 'by-player-cardtypes'}
    <SortablePlayerCardTypes {playerCardTypes} />
  {:else if item === 'by-levels'}
    <div>by levels</div>
  {/if}
</SortableCriterias>
<SortableSlots {slots} />

<label>
  <input type="checkbox" bind:checked={$groupIfSameTitle} />
  Group cards with same title
</label>

<label>
  <input type="checkbox" disabled={!$groupIfSameTitle} bind:checked={$groupOfAnyLevels} />
  Group cards of any levels
</label>
