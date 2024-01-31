import type { Writable } from 'svelte/store';

let dragged: { slots: Writable<{ name: string }[]>; index: number };
let original: { name: string }[];
let dropped: boolean;

export function onDragDrop() {
  dropped = true;
}

export function onDragEnd() {
  if (!dropped) {
    // user cancelled...
    dragged.slots.set(original);
  }
  original = [];
  dropped = false;
}

export function onDragEnter(index: number) {
  dragged.slots.update((slots) => {
    const slot = slots[dragged.index];
    slots.splice(dragged.index, 1);
    slots.splice(index, 0, slot);
    return slots;
  });

  dragged.index = index;
}

export function onDragOver(event: DragEvent) {
  event.preventDefault();
}

export function onDragStart(
  slots: Writable<{ name: string }[]>,
  index: number,
) {
  dragged = {
    slots,
    index,
  };

  const unsubscribe = slots.subscribe((value) => (original = [...value]));
  unsubscribe();

  dropped = false;
}
