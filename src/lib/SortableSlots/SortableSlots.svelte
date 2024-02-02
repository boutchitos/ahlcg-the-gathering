<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { DragDrop } from '$lib/dragDrop';

  import type { SLOT } from '$gathering/ICollectionOrganizer';

  export let slots: Writable<SLOT[]>;
  function toIcon(name: SLOT) {
    switch (name) {
      case 'Arcane':
        return 'arcane_1';

      case 'Arcane x2':
        return 'arcane_2';

      case 'Hand':
        return 'hand_1';

      case 'Hand x2':
        return 'hand_2';

      case 'Ally':
      case 'Ally. Arcane':
        return 'ally';

      case 'Accessory':
        return 'accessory';

      case 'Body':
      case 'Body. Arcane':
        return 'body';

      case 'Tarot':
        return 'tarot';

      case undefined:
        return 'tarot';
    }
  }

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
      class="size-24 hover:cursor-pointer"
      title={slot ?? 'no slot'}
      src={`/icon/slot_${toIcon(slot)}.png`}
      alt={`${slot} slot icon`}
    />
  {/each}
</div>
