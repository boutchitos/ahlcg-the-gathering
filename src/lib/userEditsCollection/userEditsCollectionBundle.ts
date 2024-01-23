import { createCollectionEditor } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { writable, type Readable, type Writable, readonly } from 'svelte/store';

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

class CollecionOutput implements ICollectionOutput {
  collectionUpdated(collection: Collection): void {
    this.onCollectionUpdated(collection);
  }

  onCollectionUpdated: (collection: Collection) => void = () => {};
}

export function userEditsCollectionBundle(): {
  allAvailableBundles: BundleOfPacks[];
} {
  const collecionOutput = new CollecionOutput();
  const collectionEditor = createCollectionEditor(collecionOutput);

  const packs = allAvailableBundles.map((bundle) => bundle.packs).flat();
  const howManyDepot = new Map<string, Writable<number>>(packs.map((name) => [name, writable(0)]));

  collecionOutput.onCollectionUpdated = (collection: Collection) => {
    packs.forEach((name) => {
      const howManyInCollection = collection.filter(
        (collectedPack) => collectedPack === name,
      ).length;
      howManyDepot.get(name)!.set(howManyInCollection);
    });
  };

  function createPack(name: string): CardsPack {
    return {
      howMany: readonly(howManyDepot.get(name)!),
      name,
      addPackToCollection: () => {
        collectionEditor.addPack(name);
      },
      removePackFromCollection: () => {
        collectionEditor.removePack(name);
      },
    };
  }

  return {
    allAvailableBundles: allAvailableBundles.map(({ packs, title }) => {
      return {
        packs: packs.map(createPack),
        title,
      };
    }),
  };
}

const allAvailableBundles = [
  {
    title: 'Arkham Horror: The Card Game',
    packs: ['Core Set', 'Revised Core Set'],
  },
  {
    title: 'The Dunwich Legacy',
    packs: ['The Dunwich Legacy', 'Return to'],
  },
];
