import { createCollectionEditor, createPackRepository } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { IPackRepository } from '$gathering/IPackRepository';
import { readonly, writable } from 'svelte/store';

export type CardsPack = {
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

  // createPack called at two places... through initListOfPack
  //   TODO try use the Store in init like $packStore.
  const packsStore = writable<CardsPack[]>(initListOfPack(packsRepository, collectionEditor));

  collecionOutput.onCollectionUpdated = (collection: Collection) => {
    const packs = initListOfPack(packsRepository, collectionEditor);

    packs.forEach((pack) => {
      pack.howMany = collection.filter((collectedPack) => collectedPack === pack.name).length;
      pack.owned = pack.howMany > 0;
    });

    packsStore.set(packs);
  };

  return {
    packsStore: readonly(packsStore),
  };
}

function createPack(name: string, collectionEditor: ICollectionEditor): CardsPack {
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
