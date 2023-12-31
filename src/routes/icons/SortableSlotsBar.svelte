<script lang="ts">
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

  function onDragDrop() {
    // console.log(`Drag drop ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    dropped = true;
  }

  function onDragEnd() {
    // console.log(`Drag end ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    if (!dropped) {
      // user cancelled...
      slots = original;
      slots = slots;
    }
    original = [];
    dropped = false;
  }

  function onDragEnter(index: number) {
    // console.log(`Drag enter ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    slots.splice(draggee.index, 1);
    slots.splice(index, 0, draggee.slot);
    draggee.index = index;
    slots = slots;
  }

  function onDragOver(event: DragEvent) {
    // console.log(`Drag over ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    event.preventDefault();
  }

  function onDragStart(slot: { name: string }, index: number) {
    // console.log(`Drag start ${index} ${draggee}`);
    // console.log(JSON.stringify(slots));
    draggee = {
      slot,
      index,
    };
    original = [...slots];
    dropped = false;
  }
</script>

<div class="flex bg-slate-400">
  {#each slots as slot, index}
    <img
      on:dragend={onDragEnd}
      on:dragenter={() => onDragEnter(index)}
      on:dragover={(event) => onDragOver(event)}
      on:dragstart={() => onDragStart(slot, index)}
      on:drop={onDragDrop}
      class="size-24 hover:cursor-pointer"
      src={`/icon/slot_${slot.name}.png`}
      alt={`${slot.name} slot icon`}
    />
  {/each}
</div>
