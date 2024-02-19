<script lang="ts">
  import SortableClasses from '$lib/SortableClasses/SortableClasses.svelte';
  import SortableCriterias from '$lib/SortableCriterias/SortableCriterias.svelte';
  import SortablePlayerCardTypes from '$lib/SortablePlayerCardTypes/SortablePlayerCardTypes.svelte';
  import SortableSlots from '$lib/SortableSlots/SortableSlots.svelte';
  import { userBrowsesItsCollection } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';
  import { SortPlayerCardsDirectivesConfig } from '../SortPlayerCardsDirectivesConfig';

  const { classes, groupByTitle, playerCardTypes, slots, sortingOrder } = userBrowsesItsCollection(
    new SortPlayerCardsDirectivesConfig(),
  );
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

<label
  ><input bind:group={$groupByTitle} type="radio" name="grouping" value="disabled" />1 card per
  pocket</label
>
<label
  ><input
    bind:group={$groupByTitle}
    type="radio"
    name="grouping"
    value="group-by-title-same-level"
  />group copies by title (same level)</label
>
<label
  ><input
    bind:group={$groupByTitle}
    type="radio"
    name="grouping"
    value="group-by-title-any-level"
  />group copies by title (any level)</label
>
