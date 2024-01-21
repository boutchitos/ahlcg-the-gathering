import { createCollectionEditor, createPackRepository } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { IPackRepository } from '$gathering/IPackRepository';
import { readonly, writable } from 'svelte/store';

type Pack = {
  howMany: number;
  name: string;
  owned: boolean;
  addPackToCollection: () => void;
  removePackFromCollection: () => void;
};

class CollecionOutput implements ICollectionOutput {
  collectionUpdated(collection: Collection): void {
    this.onCollectionUpdated(collection);
  }

  onCollectionUpdated: (collection: Collection) => void = () => {};
}

export function useCollectionEditor() {
  const packsRepository = createPackRepository();
  const collecionOutput = new CollecionOutput();
  const collectionEditor = createCollectionEditor(collecionOutput);

  // createPack called at two places...
  const packsStore = writable<Pack[]>(initListOfPack(packsRepository, collectionEditor));

  collecionOutput.onCollectionUpdated = (collection: Collection) => {
    // recreate list of packs, 0 not owned, and then count...
    packsStore.set(collection.map((pack) => createPack(pack, collectionEditor)));
  };

  return {
    packsStore: readonly(packsStore),
  };
}

function createPack(name: string, collectionEditor: ICollectionEditor): Pack {
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

function initListOfPack(packsRepository: IPackRepository, collectionEditor: ICollectionEditor) {
  return [...packsRepository.getAllPacks()].map((pack) => createPack(pack, collectionEditor));
}
