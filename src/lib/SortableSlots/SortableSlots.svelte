<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { AssetSlot } from '$gathering/ICollectionOrganizer';
  import { DragDrop } from '$lib/dragDrop';

  export let slots: Writable<AssetSlot[]>;

  const icons = {
    Accessory: 'accessory',
    Ally: 'ally',
    'Ally. Arcane': 'ally',
    Arcane: 'arcane_1',
    'Arcane x2': 'arcane_2',
    Body: 'body',
    'Body. Arcane': 'body',
    'Body. Hand x2': 'body',
    Hand: 'hand_1',
    'Hand x2. Arcane': 'hand_2',
    'Hand x2': 'hand_2',
    'Hand. Arcane': 'hand_1',
    Tarot: 'tarot',
    '-no-slot-': 'no_slot',
  };

  const dragDrop = new DragDrop<AssetSlot>(slots);
</script>

<div class="flex">
  {#each $slots as slot, index}
    <img
      on:dragend={() => dragDrop.onDragEnd()}
      on:dragenter={() => dragDrop.onDragEnter(index)}
      on:dragover={(event) => dragDrop.onDragOver(event)}
      on:dragstart={() => dragDrop.onDragStart(index)}
      on:drop={() => dragDrop.onDragDrop()}
      class="size-20 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-black"
      title={slot ?? 'no slot'}
      src={`/icon/slot_${icons[slot]}.png`}
      alt={`${slot} slot icon`}
    />
  {/each}
</div>
