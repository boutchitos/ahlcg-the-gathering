import type { Writable } from "svelte/store";

let dragged: { slots: Writable<{ name: string }[]>; slot: { name: string }; index: number };
let original: { name: string }[];
let dropped: boolean;

export function onDragDrop() {
  // console.log(`Drag drop ${index} ${draggee}`);
  // console.log(JSON.stringify(slots));
  dropped = true;
}

export function onDragEnd() {
  // console.log(`Drag end ${index} ${draggee}`);
  // console.log(JSON.stringify(slots));
  if (!dropped) {
    // user cancelled...
    dragged.slots.set(original);
    // dragged.slots = dragged.slots; // for svelte reaction i guess...
  }
  original = [];
  dropped = false;
}

export function onDragEnter(index: number) {
  // console.log(`Drag enter ${index} ${draggee}`);
  // console.log(JSON.stringify(slots));
  dragged.slots.update((slots) => {
    slots.splice(dragged.index, 1);
    slots.splice(index, 0, dragged.slot);
    return slots;
  });

  dragged.index = index;
}

export function onDragOver(event: DragEvent) {
  // console.log(`Drag over ${index} ${draggee}`);
  // console.log(JSON.stringify(slots));
  event.preventDefault();
}

export function onDragStart(slots: Writable<{ name: string }[]>, slot: { name: string }, index: number) {
  // console.log(`Drag start ${index} ${draggee}`);
  // console.log(JSON.stringify(slots));
  dragged = {
    slots,
    slot,
    index,
  };

  const unsubscribe = slots.subscribe((value) => original = [...value]);
  unsubscribe();

  dropped = false;
}
