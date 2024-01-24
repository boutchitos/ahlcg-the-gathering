import { createCollectionEditor } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { CollectionEditor } from '$gathering/CollectionEditor/CollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { writable, type Readable, type Writable, readonly } from 'svelte/store';
import { allAvailableBundles, allAvailablePacks } from './ahtcgProducts';

export interface IUserEditsCollection {
  allAvailableBundles: BundleOfPacks[];
}

export type BundleOfPacks = {
  title: string;
  packs: CardsPack[];
};

export type CardsPack = {
  howMany: Readable<number>;
  name: string;
  addPackToCollection: () => void;
  removePackFromCollection: () => void;
};

export function userEditsCollection(): IUserEditsCollection {
  const howManyPacksByName = createHowManyPacksByName();
  const collecionOutput = new CollecionOutput(howManyPacksByName);
  const collectionEditor = createCollectionEditor(collecionOutput);

  return {
    allAvailableBundles: allAvailableBundles.map(({ packs, title }) => {
      return {
        packs: packs.map((name: string) =>
          createCardsPack(name, howManyPacksByName, collectionEditor),
        ),
        title,
      };
    }),
  };
}

type HowManyPacksByName = Map<string, Writable<number>>;

class CollecionOutput implements ICollectionOutput {
  constructor(private readonly howManyPacksStore: HowManyPacksByName) {}

  collectionUpdated(collection: Collection): void {
    collection.forEach((name) => {
      const howManyStore = this.howManyPacksStore.get(name)!;
      howManyStore.set(countPackInCollection(name, collection));
    });
  }
}

function createHowManyPacksByName(): HowManyPacksByName {
  return new Map(allAvailablePacks.map((name) => [name, writable(0)]));
}

function createCardsPack(
  name: string,
  howManyPacksByName: HowManyPacksByName,
  collectionEditor: CollectionEditor,
): CardsPack {
  return {
    howMany: readonly(howManyPacksByName.get(name)!),
    name,
    addPackToCollection: () => {
      collectionEditor.addPack(name);
    },
    removePackFromCollection: () => {
      collectionEditor.removePack(name);
    },
  };
}

function countPackInCollection(name: string, collection: Collection): number {
  return collection.filter((collectedPack) => collectedPack === name).length;
}
