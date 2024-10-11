import { derived, writable, type Readable } from 'svelte/store';

import { createCollectionOrganizer } from '$gathering';
import {
  GroupPlayerCardsDirectives,
  type GroupByTitle,
} from '$gathering/CollectionOrganizer/group-cards-in-pockets/grouper-config';
import { SortPlayerCardsDirectives } from '$gathering/CollectionOrganizer/sort-player-cards';
import type { Binder, PocketCard, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type {
  ICollectionOrganizer,
  PlayerCardsSorter,
  AssetSlot,
  PlayerCardtype,
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

type OrganizingDirectivesDTO = {
  assetsSlots: string[];
  playerCardTypes: string[];
  sortingOrder: string[];
  groupByTitle: string;
  groupBondedCards: boolean;
  groupInvestigatorCards: boolean;
};

export function userBrowsesItsBinder(organizingDirectivesDTO: OrganizingDirectivesDTO): {
  binder: BinderAs2Pages;
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

  // Hack pour garder 'by-classes qui est très utilisé dans les tests, car ça ordonne la colleciton au complet avec ça.
  // Je veux juste l'enlever de la vue pour l'instant. C'est pas grave si la collection est triée par classes.
  // On extrait des binders par classe pour l'instant.
  const sortingOrder = writable(
    sortingDirectives.sortingOrder.toSpliced(
      sortingDirectives.sortingOrder.indexOf('by-classes'),
      1,
    ),
  );
  sortingOrder.subscribe((value) => {
    organizingDirectivesDTO.sortingOrder = sortingDirectives.sortingOrder;
    if (!atInit) {
      organizer.reorderPlayerCardSorters(sortingDirectives.sortingOrder);
    }
    sortingDirectives.sortingOrder = ['by-classes', ...value];
  });

  const groupByTitle = writable(groupingDirectives.groupByTitle);
  groupByTitle.subscribe((value) => {
    groupingDirectives.groupByTitle = value;
    organizingDirectivesDTO.groupByTitle = groupingDirectives.groupByTitle;
    if (!atInit) {
      organizer.groupByTitle(groupingDirectives.groupByTitle);
    }
  });

  const groupBondedCards = writable(groupingDirectives.groupBondedCards);
  groupBondedCards.subscribe((value) => {
    groupingDirectives.groupBondedCards = value;
    organizingDirectivesDTO.groupBondedCards = groupingDirectives.groupBondedCards;
    if (!atInit) {
      organizer.groupBondedCards(groupingDirectives.groupBondedCards);
    }
  });

  const groupInvestigatorCards = writable(groupingDirectives.groupInvestigatorCards);
  groupInvestigatorCards.subscribe((value) => {
    groupingDirectives.groupInvestigatorCards = value;
    organizingDirectivesDTO.groupInvestigatorCards = groupingDirectives.groupInvestigatorCards;
    if (!atInit) {
      organizer.groupInvestigatorCards(groupingDirectives.groupInvestigatorCards);
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
  sortingDirectives.byPlayerCardTypesOrder =
    organizingDirectivesDTO.playerCardTypes as PlayerCardtype[];
  sortingDirectives.sortingOrder = organizingDirectivesDTO.sortingOrder as PlayerCardsSorter[];

  const groupingDirectives = new GroupPlayerCardsDirectives();
  groupingDirectives.groupBondedCards = organizingDirectivesDTO.groupBondedCards;
  groupingDirectives.groupByTitle = organizingDirectivesDTO.groupByTitle as GroupByTitle;
  groupingDirectives.groupInvestigatorCards = organizingDirectivesDTO.groupInvestigatorCards;

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
