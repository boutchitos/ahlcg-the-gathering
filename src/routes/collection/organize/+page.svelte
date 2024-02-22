<script lang="ts">
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import SortablePlayerCardTypes from '$lib/SortablePlayerCardTypes/SortablePlayerCardTypes.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import GroupByTitle from './GroupByTitle.svelte';
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import { SortPlayerCardsDirectivesConfig } from '../SortPlayerCardsDirectivesConfig';

  const {
    classes,
    groupBondedCards,
    groupByTitle,
    groupInvestigatorCards,
    playerCardTypes,
    slots,
    sortingOrder,
  } = userBrowsesItsCollection(new SortPlayerCardsDirectivesConfig());
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

<div class="flex flex-col">
  <GroupByTitle {groupByTitle} />
  <label class="mt-3"
    ><input class="mr-3" bind:checked={$groupBondedCards} type="checkbox" />group bonded cards</label
  >
  <label class="mt-3"
    ><input class="mr-3" bind:checked={$groupInvestigatorCards} type="checkbox" />group investigator
    required cards</label
  >
</div>
