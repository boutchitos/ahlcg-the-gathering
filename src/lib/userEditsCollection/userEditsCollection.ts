import { createCollectionEditor } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { CollectionEditor } from '$gathering/CollectionEditor/CollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { readonly, writable } from 'svelte/store';

type Pack = {
  howMany: number;
  name: string;
  owned: boolean;
  addPackToCollection: () => void;
  removePackFromCollection: () => void;
};

class CollecionOutput implements ICollectionOutput {
  packs: string[] = [];
  collectionUpdated(collection: Collection): void {
    this.packs = [...collection];
  }
}

export function useCollectionEditor() {
  const collecionOutput = new CollecionOutput();
  const collectionEditor = createCollectionEditor(collecionOutput);
  const packs = writable<Pack[]>([
    createPack('Core Set', collectionEditor),
    createPack('Revised Core Set', collectionEditor),
  ]);
  return {
    packsStore: readonly(packs),
  };
}

function createPack(name: string, collectionEditor: CollectionEditor): Pack {
  return {
    howMany: 0,
    name,
    owned: false,
    addPackToCollection: () => {
      collectionEditor.addPack(name);
    },
    removePackFromCollection: () => {
      collectionEditor.removePack(name);
    },
  };
}
