<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { PLAYER_CARD_TYPE } from '$gathering/ICollectionOrganizer';
  import { DragDrop } from '$lib/dragDrop';

  export let playerCardTypes: Writable<PLAYER_CARD_TYPE[]>;

  const dragDrop = new DragDrop<PLAYER_CARD_TYPE>(playerCardTypes);
</script>

<ul class="inline-flex">
  {#each $playerCardTypes as playerCardType, index}
    <li
      draggable="true"
      on:dragend={() => dragDrop.onDragEnd()}
      on:dragenter={() => dragDrop.onDragEnter(index)}
      on:dragover={(event) => dragDrop.onDragOver(event)}
      on:dragstart={() => dragDrop.onDragStart(index)}
      on:drop={() => dragDrop.onDragDrop()}
      class="p-2 text-xl hover:cursor-pointer hover:shadow-md"
    >
      {playerCardType}
    </li>
  {/each}
</ul>
