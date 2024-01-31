<script lang="ts">
  import { DragDrop } from '$lib/SortableClasses/dragDrop';
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

  const dragDrop = new DragDrop<{ name: string }>(slots);
</script>

<div class="flex bg-slate-400">
  {#each $slots as slot, index}
    <img
      on:dragend={() => dragDrop.onDragEnd()}
      on:dragenter={() => dragDrop.onDragEnter(index)}
      on:dragover={(event) => dragDrop.onDragOver(event)}
      on:dragstart={() => dragDrop.onDragStart(index)}
      on:drop={() => dragDrop.onDragDrop()}
      class="size-24 hover:cursor-pointer"
      src={`/icon/slot_${slot.name}.png`}
      alt={`${slot.name} slot icon`}
    />
  {/each}
</div>
