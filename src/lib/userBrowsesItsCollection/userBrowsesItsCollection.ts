import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import {
  fixAssetsBySlots,
  fixByClasses,
  fixByPlayerCardtypes,
  fixPlayerCardsSortingOrder,
  type CLASS,
  type ICollectionOrganizer,
  type PLAYER_CARDS_SORTER,
  type PLAYER_CARD_TYPE,
  type SLOT,
} from '$gathering/ICollectionOrganizer';

export type CardListing = { label: string }[];

export type PocketViewModel = {
  cardListing: CardListing;
  coverImage: {
    landscape: boolean;
    url: string;
  };
  title: string;
};

export type BinderPage = {
  pockets: PocketViewModel[];
};

export type BinderAs2Pages = {
  currentPage: Readable<number>;
  howManyPages: Readable<number>;

  leftPage: Readable<BinderPage>;
  rightPage: Readable<BinderPage>;

  handleLeftPageClick: () => void;
  handleRightPageClick: () => void;
};

type SortingDirectives = {
  classes: string[];
  assetsSlots: string[];
  playerCardTypes: string[];
  sortingOrder: string[];
};

export function userBrowsesItsCollection(sortingDirectives: SortingDirectives): {
  binder: BinderAs2Pages;
  classes: Writable<CLASS[]>;
  playerCardTypes: Writable<PLAYER_CARD_TYPE[]>;
  slots: Writable<SLOT[]>;
  sortingOrder: Writable<PLAYER_CARDS_SORTER[]>;
} {
  const organizer: ICollectionOrganizer = createCollectionOrganizer();
  const binderOutput = new BinderOutput();
  organizer.onBinderUpdated(binderOutput);

  const pocketsVM = derived(binderOutput.binder, (binder: Binder) =>
    binder.pockets.map(toPocketViewModel),
  );
  const pocketOffset = writable(0);
  const currentPage = derived(pocketOffset, (pocketOffset) => Math.ceil(pocketOffset / 9) + 1);
  const howManyPages = derived(pocketsVM, (pocketsVM) => Math.ceil(pocketsVM.length / 9));
  const leftPage = derived([pocketsVM, pocketOffset], ([pocketsVM, pocketOffset]) =>
    getPockets(pocketsVM, pocketOffset, 0),
  );
  const rightPage = derived([pocketsVM, pocketOffset], ([pocketsVM, pocketOffset]) =>
    getPockets(pocketsVM, pocketOffset, 9),
  );

  function getPockets(
    pockets: PocketViewModel[],
    pocketOffset: number,
    offset: number,
  ): BinderPage {
    const base = pocketOffset + offset;
    return { pockets: pockets.slice(base, base + 9) };
  }

  const classes = writable(fixByClasses(sortingDirectives.classes));
  classes.subscribe((value) => {
    organizer.reorderByClasses(value);
  });

  const slots = writable(fixAssetsBySlots(sortingDirectives.assetsSlots));
  slots.subscribe((value) => {
    organizer.reorderBySlots(value);
  });

  const playerCardTypes = writable(fixByPlayerCardtypes(sortingDirectives.playerCardTypes));
  playerCardTypes.subscribe((value) => {
    organizer.reorderByPlayerCardTypes(value);
  });

  const sortingOrder = writable(fixPlayerCardsSortingOrder(sortingDirectives.sortingOrder));
  sortingOrder.subscribe((value) => {
    organizer.reorderPlayerCardSorters(value);
  });

  return {
    binder: {
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
    },
    classes,
    playerCardTypes,
    slots,
    sortingOrder,
  };
}

class BinderOutput implements IBinderOutput {
  public binder = writable<Binder>();

  binderUpdated(binder: Binder): void {
    this.binder.set(binder);
  }
}

function toPocketViewModel(pocket: Pocket): PocketViewModel {
  const coverCard = pocket.cards[0];
  return {
    cardListing: getCardListing(pocket.cards),
    coverImage: {
      landscape: coverCard.type_code === 'investigator',
      url: `https://arkhamdb.com${coverCard.imagesrc}`,
    },
    title: coverCard.name,
  };
}

function getCardListing(cards: Card[]): CardListing {
  const pip = '\u2022';
  const labels: string[] = [];
  const count = new Map<string, number>();

  cards.forEach((card) => {
    const label = `${card.name} ${pip.repeat(card.xp)}`;
    if (count.has(label)) {
      count.set(label, count.get(label)! + 1);
    } else {
      count.set(label, 1);
      labels.push(label);
    }
  });

  return labels.map((label) => `${count.get(label)}x ${label}`).map((label) => ({ label }));
}
