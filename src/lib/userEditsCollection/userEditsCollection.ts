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

export function userEditsCollection(): {
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
    packs: ['Core Set', 'Revised Core Set', 'Return to the Night of the Zealot'],
  },
  {
    title: 'The Dunwich Legacy',
    packs: [
      'The Dunwich Legacy Investigator Expansion',
      'The Dunwich Legacy Campaign Expansion',
      'Return to the Dunwich Legacy',
      'The Dunwich Legacy',
      'The Miskatonic Museum',
      'The Essex County Express',
      'Blood on the Altar',
      'Undimensioned and Unseen',
      'Where Doom Awaits',
      'Lost in Time and Space',
    ],
  },
  {
    title: 'The Path to Carcosa',
    packs: [
      'The Path to Carcosa Investigator Expansion',
      'The Path to Carcosa Campaign Expansion',
      'Return to the Path to Carcosa',
      'The Path to Carcosa',
      'Echoes of the Past',
      'The Unspeakable Oath',
      'A Phantom of Truth',
      'The Pallid Mask',
      'Black Stars Rise',
      'Dim Carcosa',
    ],
  },
  {
    title: 'The Forgotten Age',
    packs: [
      'The Forgotten Age Investigator Expansion',
      'The Forgotten Age Campaign Expansion',
      'Return to the Forgotten Age',
      'The Forgotten Age',
      'Threads of Fate',
      'The Boundary Beyond',
      'Heart of the Elders',
      'The City of Archives',
      'The Depths of Yoth',
      'Shattered Aeons',
      'Return to the Forgotten Age',
    ],
  },
  {
    title: 'The Circle Undone',
    packs: [
      'The Circle Undone Investigator Expansion',
      'The Circle Undone Campaign Expansion',
      'Return to the Circle Undone',
      'The Circle Undone',
      'The Secret Name',
      'The Wages of Sin',
      'For the Greater Good',
      'Union and Disillusion',
      'In the Clutches of Chaos',
      'Before the Black Throne',
    ],
  },
  {
    title: 'The Dream-Eaters',
    packs: [
      'The Dream-Eaters',
      'The Search for Kadath',
      'A Thousand Shapes of Horror',
      'Dark Side of the Moon',
      'Point of No Return',
      'Where the Gods Dwell',
      'Weaver of the Cosmos',
    ],
  },
  {
    title: 'The Innsmouth Conspiracy',
    packs: [
      'The Innsmouth Conspiracy',
      'In Too Deep',
      'Devil Reef',
      'Horror in High Gear',
      'A Light in the Fog',
      'The Lair of Dagon',
      'Into the Maelstrom',
    ],
  },
  {
    title: 'Edge of the Earth',
    packs: ['Edge of the Earth Investigator Expansion', 'Edge of the Earth Campaign Expansion'],
  },
  {
    title: 'The Scarlet Keys',
    packs: ['The Scarlet Keys Campaign Expansion', 'The Scarlet Keys Investigator Expansion'],
  },
  {
    title: 'The Feast of Hemlock Vale',
    packs: [
      'The Feast of Hemlock Vale Investigator Expansion',
      'The Feast of Hemlock Vale Campaign Expansion',
    ],
  },
  {
    title: 'Investigator Starter Decks',
    packs: [
      'Winifred Habbamock Investigator Starter Deck',
      'Nathaniel Cho Investigator Starter Deck',
      'Harvey Walters Investigator Starter Deck',
      'Jacqueline Fine Investigator Starter Deck',
      'Stella Clark Investigator Starter Deck',
    ],
  },
  {
    title: 'Standalone Adventures',
    packs: [
      'Curse of the Rougarou',
      'Carnevale of Horrors',
      'The Labyrinths of Lunacy',
      'Guardians of the Abyss',
      'Murder at the Excelsior Hotel',
      'Barkham Horror: The Meddling of Meowlathotep',
      'The Blob That Ate Everything',
      'War of the Outer Gods',
      'Machinations Through Time',
      'Fortune and Folly',
    ],
  },
];
