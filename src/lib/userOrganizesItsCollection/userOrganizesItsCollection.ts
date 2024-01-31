// import { createCollectionEditor } from '$gathering';
// import type { Collection } from '$gathering/Collection';
// import type { ICollectionOutput } from '$gathering/ICollectionOutput';
// import { writable, type Readable, type Writable, readonly } from 'svelte/store';
// import type { ICollectionEditor } from '$gathering/ICollectionEditor';

import { writable } from "svelte/store";

// class

// export type BundleOfPacks = {
//   title: string;
//   packs: CardsPack[];
// };

// export type CardsPack = {
//   howMany: Readable<number>;
//   name: string;
//   addPackToCollection: () => void;
//   removePackFromCollection: () => void;
// };

export function userOrganizesItsCollection() {
//onCollectionUpdated?: ICollectionOutput,
  return {
    classes: writable(['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral'])
  };
}
//   const howManyPacksIndex = createHowManyPacksIndex();
//   const syncHowManyPacksIndex = new SyncHowManyPacksIndex(howManyPacksIndex);
//   const outputs: ICollectionOutput = {
//     collectionUpdated(collection: Collection) {
//       syncHowManyPacksIndex.collectionUpdated(collection);
//       onCollectionUpdated?.collectionUpdated(collection);
//     },
//   };
//   const collectionEditor = createCollectionEditor(outputs);

//   return {
//     allAvailableBundles: allAvailableBundles.map(({ packs, title }) => {
//       return {
//         packs: packs.map((name: string) =>
//           createCardsPack(name, howManyPacksIndex, collectionEditor),
//         ),
//         title,
//       };
//     }),
//     resetCollection: () => {
//       collectionEditor.resetCollection();
//     },
//   };
// }

// type HowManyPacksIndex = Map<string, Writable<number>>;

// class SyncHowManyPacksIndex implements ICollectionOutput {
//   constructor(private readonly howManyPacksIndex: HowManyPacksIndex) {}

//   collectionUpdated(collection: Collection): void {
//     this.howManyPacksIndex.forEach((howManyPacks, name) => {
//       const howMany = countPackInCollection(name, collection);
//       howManyPacks.set(howMany);
//     });
//   }
// }

// function createHowManyPacksIndex(): HowManyPacksIndex {
//   return new Map(allAvailablePacks.map((name) => [name, writable(0)]));
// }

// function createCardsPack(
//   name: string,
//   howManyPacksIndex: HowManyPacksIndex,
//   collectionEditor: ICollectionEditor,
// ): CardsPack {
//   return {
//     howMany: readonly(howManyPacksIndex.get(name)!),
//     name,
//     addPackToCollection: () => {
//       collectionEditor.addPack(name);
//     },
//     removePackFromCollection: () => {
//       collectionEditor.removePack(name);
//     },
//   };
// }

// function countPackInCollection(name: string, collection: Collection): number {
//   return collection.filter((collectedPack) => collectedPack === name).length;
// }
