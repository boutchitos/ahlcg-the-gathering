<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { DragDrop } from '$lib/dragDrop';

  import ReorderIcon from './ReorderIcon.svelte';

  export let items: Writable<string[]>;

  let hovering = writable(false);

  const dragDrop = new DragDrop<string>(items);
  $: dragging = dragDrop.dragging;
</script>

<ul>
  {#each $items as item, index}
    <li class="mb-3 {$dragging ? 'shadow-md' : ''}">
      <div
        class="inline-flex items-center"
        role="listitem"
        on:mouseover={() => {
          hovering.set(true);
        }}
        on:focus={() => {}}
        on:mouseleave={() => {
          hovering.set(false);
        }}
      >
        <div
          draggable="true"
          role="listitem"
          on:dragend={() => dragDrop.onDragEnd()}
          on:dragenter={() => dragDrop.onDragEnter(index)}
          on:dragover={(event) => dragDrop.onDragOver(event)}
          on:dragstart={() => dragDrop.onDragStart(index)}
          on:drop={() => dragDrop.onDragDrop()}
        >
          <ReorderIcon class="mr-10 size-10 {$hovering ? '' : 'invisible'}" />
        </div>
        <slot {item} />
      </div>
    </li>
  {/each}
</ul>
