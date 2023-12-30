<script lang="ts">
  function onDrop(event: DragEvent) {
    console.log(JSON.stringify(event, undefined, 2));
  }

  let slots: { name: string }[] = [
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
  ];

  let draggee: { slot: { name: string }; index: number };
  let original: { name: string }[];
  let dropped: boolean;

  function onDragEvent(event: DragEvent, slot: { name: string }, index: number, name: string) {
    // console.log(`${name} ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    if (name === 'start') {
      console.log(`${name} ${index} ${draggee}`);
      draggee = {
        slot,
        index,
      };
      original = [...slots];
      dropped = false;
    }

    if (name === 'enter') {
      slots.splice(draggee.index, 1);
      slots.splice(index, 0, draggee.slot);
      draggee.index = index;
      slots = slots;
    }

    if (name === 'over') {
      event.preventDefault();
    }

    if (name === 'end') {
      if (!dropped) {
        // user cancelled...
        slots = original;
        slots = slots;
      }
      original = [];
      dropped = false;
    }

    if (name === 'drop') {
      dropped = true;
    }
  }
</script>

<div class="flex bg-slate-400">
  {#each slots as slot, index}
    <img
      on:dragend={(event) => onDragEvent(event, slot, index, 'end')}
      on:dragenter={(event) => onDragEvent(event, slot, index, 'enter')}
      on:dragover={(event) => onDragEvent(event, slot, index, 'over')}
      on:dragstart={(event) => onDragEvent(event, slot, index, 'start')}
      on:drop={(event) => onDragEvent(event, slot, index, 'drop')}
      class="size-24"
      src={`/icon/slot_${slot.name}.png`}
      alt={`${slot.name} slot icon`}
    />
  {/each}
</div>
