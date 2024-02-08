import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type {
  CLASS,
  ICollectionOrganizer,
  PLAYER_CARD_TYPE,
  SLOT,
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

type PLAYER_CARDS_SORTER = string;

export function userBrowsesItsCollection(): {
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

  const classes = writable<CLASS[]>([
    'guardian',
    'mystic',
    'rogue',
    'seeker',
    'survivor',
    'neutral',
    'multi',
  ]);
  classes.subscribe((value) => {
    organizer.reorderByClasses(value);
  });

  const slots = writable<SLOT[]>([
    'Arcane',
    'Arcane x2',
    'Hand',
    'Hand x2',
    'Hand. Arcane',
    'Hand x2. Arcane',
    'Ally',
    'Ally. Arcane',
    'Accessory',
    'Body',
    'Body. Arcane',
    'Body. Hand x2',
    'Tarot',
    undefined,
  ]);
  slots.subscribe((value) => {
    organizer.reorderBySlots(value);
  });

  const playerCardTypes = writable<PLAYER_CARD_TYPE[]>(['investigator', 'asset', 'event', 'skill']);
  playerCardTypes.subscribe((value) => {
    organizer.reorderByPlayerCardTypes(value);
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
    sortingOrder: writable(['classes', 'slots', 'player-card-types']),
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
