import { readonly, writable, type Writable } from 'svelte/store';

export class DragDrop<Item> {
  private wDragging = writable(false);
  private dropped: boolean = false;
  private index: number = 0;
  private original: Item[] = [];

  constructor(private readonly items: Writable<Item[]>) {
    const unsubscribe = items.subscribe((value) => (this.original = [...value]));
    unsubscribe();
  }

  get dragging() {
    return readonly(this.wDragging);
  }

  onDragDrop() {
    this.dropped = true;
  }

  onDragEnd() {
    this.wDragging.set(false);
    if (!this.dropped) {
      // user cancelled...
      this.items.set(this.original);
    }
    this.original = [];
    this.dropped = false;
  }

  onDragEnter(index: number) {
    this.items.update((value) => {
      const item = value[this.index];
      value.splice(this.index, 1);
      value.splice(index, 0, item);
      return value;
    });

    this.index = index;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragStart(index: number) {
    this.wDragging.set(true);
    this.index = index;
    this.dropped = false;

    // neater trick to get value. update instead of subscribe ;)
    // will see if this hits performence.
    this.items.update((value) => {
      this.original = value;
      return value;
    });
  }
}
