<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { DragDrop } from '$lib/dragDrop';

  import type { SLOT } from '$gathering/ICollectionOrganizer';
  export let slots: Writable<SLOT[]>;

  const icons = {
    Accessory: 'accessory',
    Ally: 'ally',
    'Ally. Arcane': 'ally',
    Arcane: 'arcane_1',
    'Arcane x2': 'arcane_2',
    Body: 'body',
    'Body. Arcane': 'body',
    Hand: 'hand_1',
    'Hand x2': 'hand_2',
    Tarot: 'tarot',
    no_slot: 'no_slot',
  };

  const dragDrop = new DragDrop<SLOT>(slots);
</script>

<div class="flex">
  {#each $slots as slot, index}
    <img
      on:dragend={() => dragDrop.onDragEnd()}
      on:dragenter={() => dragDrop.onDragEnter(index)}
      on:dragover={(event) => dragDrop.onDragOver(event)}
      on:dragstart={() => dragDrop.onDragStart(index)}
      on:drop={() => dragDrop.onDragDrop()}
      class="size-20 hover:cursor-pointer"
      title={slot ?? 'no slot'}
      src={`/icon/slot_${icons[slot ?? 'no_slot']}.png`}
      alt={`${slot} slot icon`}
    />
  {/each}
</div>
