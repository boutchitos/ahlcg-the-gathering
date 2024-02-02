import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { CLASS, ICollectionOrganizer } from '$gathering/ICollectionOrganizer';

export type PocketViewModel = {
  cards: { title: string }[];
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

export function userBrowsesItsCollection(): {
  binder: BinderAs2Pages;
  classes: Writable<string[]>;
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
    organizer.reorderClasses(value);
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
    cards: pocket.cards.map((card) => ({ title: getCardTitle(card) })),
    coverImage: {
      landscape: coverCard.type_code === 'investigator',
      url: `https://arkhamdb.com${coverCard.imagesrc}`,
    },
    title: coverCard.name,
  };
}

function getCardTitle(card: Card): string {
  const pip = '\u2022';
  return `${card.name} ${pip.repeat(card.xp)}`;
}
