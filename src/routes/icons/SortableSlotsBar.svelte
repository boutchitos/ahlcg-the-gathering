<script lang="ts">
  import {
    onDragDrop,
    onDragEnd,
    onDragEnter,
    onDragOver,
    onDragStart,
  } from '$lib/SortableClasses/dragDrop';
  import { writable } from 'svelte/store';

  let slots = writable([
    {
      name: 'accessory',
    },
    {
      name: 'ally',
    },
    {
      name: 'arcane_1',
    },
    {
      name: 'arcane_2',
    },
    {
      name: 'body',
    },
    {
      name: 'hand_1',
    },
    {
      name: 'hand_2',
    },
    {
      name: 'tarot',
    },
  ]);
</script>

<div class="flex bg-slate-400">
  {#each $slots as slot, index}
    <img
      on:dragend={onDragEnd}
      on:dragenter={() => onDragEnter(index)}
      on:dragover={(event) => onDragOver(event)}
      on:dragstart={() => onDragStart(slots, slot, index)}
      on:drop={onDragDrop}
      class="size-24 hover:cursor-pointer"
      src={`/icon/slot_${slot.name}.png`}
      alt={`${slot.name} slot icon`}
    />
  {/each}
</div>
