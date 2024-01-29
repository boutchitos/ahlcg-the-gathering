import { derived, readable, writable, type Readable } from 'svelte/store';
import ahdbPacks from './ahdb.packs.json';
import couzListOfPacks from './couz.json';
import {
  type CollectionPack,
  type Pack,
  cleanAHDBCards,
  getCardsByPackCode,
  getPacksByCode,
  getInvestigatorCards,
  sortCardsAsUserWant,
  regroupByPockets,
} from '$gathering/CollectionOrganizer/regroupByPockets';
import type { Card, Pocket } from '$gathering/IBinderOutput';

export type PocketViewModel = {
  title: string;
  coverImage: {
    landscape: boolean;
    url: string;
  };
};

export type BinderPage = {
  pockets: PocketViewModel[];
};

export type Binder = {
  currentPage: Readable<number>;
  howManyPages: Readable<number>;

  leftPage: Readable<BinderPage>;
  rightPage: Readable<BinderPage>;

  handleLeftPageClick: () => void;
  handleRightPageClick: () => void;
};

export function userBrowsesItsCollection(): Binder {
  const allCards = cleanAHDBCards();

  const packsByCode: Map<string, Pack> = getPacksByCode(ahdbPacks);
  const cardsByPackCode: Map<string, Card[]> = getCardsByPackCode(allCards);

  const packsCollection: Array<Pack & CollectionPack> = couzListOfPacks.map(
    (collPack: Record<string, unknown>) => {
      if (collPack.packCode === undefined || typeof collPack.packCode !== 'string') {
        throw new Error(
          `packCode missing or is not a string in pack '${JSON.stringify(collPack)}'`,
        );
      }

      return Object.assign({ nbCopies: 1 }, packsByCode.get(collPack.packCode), collPack) as Pack &
        CollectionPack;
    },
  );

  const investigatorCardsCollection = getInvestigatorCards(cardsByPackCode, packsCollection).sort(
    sortCardsAsUserWant,
  );
  const pockets = regroupByPockets(investigatorCardsCollection);
  const pocketsVM = pockets.map(toPocketViewModel);

  const pocketOffset = writable(0);
  const currentPage = derived(pocketOffset, (pocketOffset) => Math.ceil(pocketOffset / 9) + 1);
  const howManyPages = readable(Math.ceil(pocketsVM.length / 9));
  const leftPage = derived(pocketOffset, (pocketOffset) => getPockets(pocketsVM, pocketOffset, 0));
  const rightPage = derived(pocketOffset, (pocketOffset) => getPockets(pocketsVM, pocketOffset, 9));

  function getPockets(
    pockets: PocketViewModel[],
    pocketOffset: number,
    offset: number,
  ): BinderPage {
    const base = pocketOffset + offset;
    return { pockets: pockets.slice(base, base + 9) };
  }

  function toPocketViewModel(pocket: Pocket): PocketViewModel {
    const coverCard = pocket.cards[0];
    return {
      title: coverCard.name,
      coverImage: {
        landscape: coverCard.type_code === 'investigator',
        url: `https://arkhamdb.com${coverCard.imagesrc}`,
      },
    };
  }

  return {
    currentPage,
    howManyPages,

    leftPage,
    rightPage,

    handleLeftPageClick: () => {
      pocketOffset.update((pocketOffset) => {
        pocketOffset -= 18;
        return pocketOffset < 0 ? 0 : pocketOffset;
      });
    },

    handleRightPageClick: () => {
      pocketOffset.update((pocketOffset) => {
        return pocketOffset + 18;
      });
    },
  };
}
