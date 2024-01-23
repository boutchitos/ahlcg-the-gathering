export type BundleOfPacks = {
  title: string;
  packs: CardsPack[];
};

export type CardsPack = {
  // howMany: number;
  name: string;
  // addPackToCollection: () => void;
  // removePackFromCollection: () => void;
};

// class CollecionOutput implements ICollectionOutput {
//   collectionUpdated(collection: Collection): void {
//     this.onCollectionUpdated(collection);
//   }

//   onCollectionUpdated: (collection: Collection) => void = () => {};
// }

export function userEditsCollectionBundle(): {
  allAvailableBundles: BundleOfPacks[];
} {
  // const packsRepository = createPackRepository();
  // const collecionOutput = new CollecionOutput();
  // const collectionEditor = createCollectionEditor(collecionOutput);

  // collecionOutput.onCollectionUpdated = (collection: Collection) => {
  //   const packs = initListOfPack(packsRepository, collectionEditor);

  //   packs.forEach((pack) => {
  //     pack.howMany = collection.filter((collectedPack) => collectedPack === pack.name).length;
  //     pack.owned = pack.howMany > 0;
  //   });

  //   packsStore.set(packs);
  // };

  return {
    allAvailableBundles: allAvailableBundles.map(({ packs, title }) => {
      return {
        packs: packs.map((pack) => ({ name: pack })),
        title,
      };
    }),
  };
}

// function createPack(name: string, collectionEditor: ICollectionEditor): CardsPack {
//   return {
//     howMany: 0,
//     name,
//     owned: false,
//     addPackToCollection: () => {
//       collectionEditor.addPack(name);
//     },
//     removePackFromCollection: () => {
//       collectionEditor.removePack(name);
//     },
//   };
// }

const allAvailableBundles = [
  {
    title: 'Arkham Horror: The Card Game',
    packs: ['Core Set', 'Revised Core Set'],
  },
  {
    title: 'The Dunwich Legacy',
    packs: ['The Dunwich Legacy', 'Return to ...'],
  },
];
