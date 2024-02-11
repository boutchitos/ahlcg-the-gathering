import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, PocketCard, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import {
  fixAssetsBySlotsOrder,
  fixByClassesOrder,
  fixByPlayerCardtypesOrder,
  fixPlayerCardsSortingOrder,
  type PlayerCardClass,
  type ICollectionOrganizer,
  type PlayerCardsSorter,
  type AssetSlot,
  type PlayerCardtype,
} from '$gathering/ICollectionOrganizer';
import { SortPlayerCardsDirectives } from '$gathering/CollectionOrganizer/sort-player-cards';

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
  classes: Writable<PlayerCardClass[]>;
  playerCardTypes: Writable<PlayerCardtype[]>;
  slots: Writable<AssetSlot[]>;
  sortingOrder: Writable<PlayerCardsSorter[]>;
} {
  const directives = createOrganizerDirectives(sortingDirectives);
  const organizer: ICollectionOrganizer = createCollectionOrganizer(directives);
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

  let atInit = true;

  const classes = writable(fixByClassesOrder(sortingDirectives.classes));
  classes.subscribe((value) => {
    const fixed = fixByClassesOrder(value);
    sortingDirectives.classes = fixed;
    if (!atInit) {
      organizer.reorderByClasses(fixed);
    }
  });

  const slots = writable(fixAssetsBySlotsOrder(sortingDirectives.assetsSlots));
  slots.subscribe((value) => {
    const fixed = fixAssetsBySlotsOrder(value);
    sortingDirectives.assetsSlots = fixed;
    if (!atInit) {
      organizer.reorderBySlots(value);
    }
  });

  const playerCardTypes = writable(fixByPlayerCardtypesOrder(sortingDirectives.playerCardTypes));
  playerCardTypes.subscribe((value) => {
    const fixed = fixByPlayerCardtypesOrder(value);
    sortingDirectives.playerCardTypes = fixed;
    if (!atInit) {
      organizer.reorderByPlayerCardTypes(value);
    }
  });

  const sortingOrder = writable(fixPlayerCardsSortingOrder(sortingDirectives.sortingOrder));
  sortingOrder.subscribe((value) => {
    const fixed = fixPlayerCardsSortingOrder(value);
    sortingDirectives.sortingOrder = fixed;
    if (!atInit) {
      organizer.reorderPlayerCardSorters(value);
    }
  });

  atInit = false;

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

function createOrganizerDirectives(sortingDirectives: SortingDirectives) {
  const organizerDirectives = new SortPlayerCardsDirectives();
  organizerDirectives.assetsBySlotsOrder = sortingDirectives.assetsSlots as AssetSlot[];
  organizerDirectives.byClassesOrder = sortingDirectives.classes as PlayerCardClass[];
  organizerDirectives.byPlayerCardTypesOrder =
    sortingDirectives.playerCardTypes as PlayerCardtype[];
  organizerDirectives.sortingOrder = sortingDirectives.sortingOrder as PlayerCardsSorter[];
  return organizerDirectives;
}

function toPocketViewModel(pocket: Pocket): PocketViewModel {
  const coverCard = pocket.cards[0];
  return {
    cardListing: getCardListing(pocket.cards),
    coverImage: coverCard.image,
    title: coverCard.name,
  };
}

function getCardListing(cards: PocketCard[]): CardListing {
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
