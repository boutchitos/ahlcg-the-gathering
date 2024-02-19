import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, PocketCard, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type {
  PlayerCardClass,
  ICollectionOrganizer,
  PlayerCardsSorter,
  AssetSlot,
  PlayerCardtype,
} from '$gathering/ICollectionOrganizer';
import { SortPlayerCardsDirectives } from '$gathering/CollectionOrganizer/sort-player-cards';
import { GroupPlayerCardsDirectives } from '$gathering/CollectionOrganizer/group-cards-in-pockets/grouper-config';

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

type OrganizingDirectivesDTO = {
  classes: string[];
  assetsSlots: string[];
  playerCardTypes: string[];
  sortingOrder: string[];
  groupCardsIfSameTitle: boolean;
  groupCardsOfAnyLevels: boolean;
};

export function userBrowsesItsCollection(organizingDirectivesDTO: OrganizingDirectivesDTO): {
  binder: BinderAs2Pages;
  classes: Writable<PlayerCardClass[]>;
  playerCardTypes: Writable<PlayerCardtype[]>;
  slots: Writable<AssetSlot[]>;
  sortingOrder: Writable<PlayerCardsSorter[]>;
  groupCardsIfSameTitle: Writable<boolean>;
  groupCardsOfAnyLevels: Writable<boolean>;
} {
  const { groupingDirectives, sortingDirectives } =
    createOrganizingDirectives(organizingDirectivesDTO);
  const organizer: ICollectionOrganizer = createCollectionOrganizer(
    sortingDirectives,
    groupingDirectives,
  );
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

  const classes = writable(sortingDirectives.byClassesOrder);
  classes.subscribe((value) => {
    sortingDirectives.byClassesOrder = value;
    organizingDirectivesDTO.classes = sortingDirectives.byClassesOrder;
    if (!atInit) {
      organizer.reorderByClasses(sortingDirectives.byClassesOrder);
    }
  });

  const slots = writable(sortingDirectives.assetsBySlotsOrder);
  slots.subscribe((value) => {
    sortingDirectives.assetsBySlotsOrder = value;
    organizingDirectivesDTO.assetsSlots = sortingDirectives.assetsBySlotsOrder;
    if (!atInit) {
      organizer.reorderBySlots(sortingDirectives.assetsBySlotsOrder);
    }
  });

  const playerCardTypes = writable(sortingDirectives.byPlayerCardTypesOrder);
  playerCardTypes.subscribe((value) => {
    sortingDirectives.byPlayerCardTypesOrder = value;
    organizingDirectivesDTO.playerCardTypes = sortingDirectives.byPlayerCardTypesOrder;
    if (!atInit) {
      organizer.reorderByPlayerCardTypes(sortingDirectives.byPlayerCardTypesOrder);
    }
  });

  const sortingOrder = writable(sortingDirectives.sortingOrder);
  sortingOrder.subscribe((value) => {
    sortingDirectives.sortingOrder = value;
    organizingDirectivesDTO.sortingOrder = sortingDirectives.sortingOrder;
    if (!atInit) {
      organizer.reorderPlayerCardSorters(sortingDirectives.sortingOrder);
    }
  });

  const groupCardsIfSameTitle = writable(groupingDirectives.groupCardsIfSameTitle);
  groupCardsIfSameTitle.subscribe((value) => {
    groupingDirectives.groupCardsIfSameTitle = value;
    organizingDirectivesDTO.groupCardsIfSameTitle = groupingDirectives.groupCardsIfSameTitle;
    if (!atInit) {
      organizer.groupCardsIfSameTitle(groupingDirectives.groupCardsIfSameTitle);
    }
  });

  const groupCardsOfAnyLevels = writable(groupingDirectives.groupCardsOfAnyLevels);
  groupCardsOfAnyLevels.subscribe((value) => {
    groupingDirectives.groupCardsOfAnyLevels = value;
    organizingDirectivesDTO.groupCardsOfAnyLevels = groupingDirectives.groupCardsOfAnyLevels;
    if (!atInit) {
      organizer.groupCardsOfAnyLevels(groupingDirectives.groupCardsOfAnyLevels);
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
    groupCardsIfSameTitle,
    groupCardsOfAnyLevels,
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

function createOrganizingDirectives(organizingDirectivesDTO: OrganizingDirectivesDTO) {
  const sortingDirectives = new SortPlayerCardsDirectives();
  sortingDirectives.assetsBySlotsOrder = organizingDirectivesDTO.assetsSlots as AssetSlot[];
  sortingDirectives.byClassesOrder = organizingDirectivesDTO.classes;
  sortingDirectives.byPlayerCardTypesOrder =
    organizingDirectivesDTO.playerCardTypes as PlayerCardtype[];
  sortingDirectives.sortingOrder = organizingDirectivesDTO.sortingOrder as PlayerCardsSorter[];

  const groupingDirectives = new GroupPlayerCardsDirectives();
  groupingDirectives.groupCardsIfSameTitle = organizingDirectivesDTO.groupCardsIfSameTitle;
  groupingDirectives.groupCardsOfAnyLevels = organizingDirectivesDTO.groupCardsOfAnyLevels;

  return { groupingDirectives, sortingDirectives };
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
