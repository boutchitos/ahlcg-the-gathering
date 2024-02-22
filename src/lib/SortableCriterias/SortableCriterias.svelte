<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { DragDrop } from '$lib/dragDrop';

  import ReorderIcon from './ReorderIcon.svelte';

  export let items: Writable<string[]>;

  const dragDrop = new DragDrop<string>(items);
  $: dragging = dragDrop.dragging;
</script>

<ul>
  {#each $items as item, index}
    <li class="p-1 {$dragging ? 'shadow-md' : ''}">
      <div class="inline-flex items-center" role="listitem">
        <div
          draggable="true"
          role="listitem"
          on:dragend={() => dragDrop.onDragEnd()}
          on:dragenter={() => dragDrop.onDragEnter(index)}
          on:dragover={(event) => dragDrop.onDragOver(event)}
          on:dragstart={() => dragDrop.onDragStart(index)}
          on:drop={() => dragDrop.onDragDrop()}
        >
          <ReorderIcon class="mr-2 size-10 fill-gray-500" />
        </div>
        <slot {item} />
      </div>
    </li>
  {/each}
</ul>
