import { derived, readable, writable, type Readable } from 'svelte/store';
import { createCollectionOrganizer } from '$gathering';
import type { Binder, IBinderOutput, Pocket } from '$gathering/IBinderOutput';

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

export type BinderAs2Pages = {
  currentPage: Readable<number>;
  howManyPages: Readable<number>;

  leftPage: Readable<BinderPage>;
  rightPage: Readable<BinderPage>;

  handleLeftPageClick: () => void;
  handleRightPageClick: () => void;
};

class BinderOutput implements IBinderOutput {
  binder: Binder = { pockets: [] };

  binderUpdated(binder: Binder): void {
    this.binder = { pockets: [...binder.pockets] };
  }
}

export function userBrowsesItsCollection(): BinderAs2Pages {
  const organizer = createCollectionOrganizer();
  const binderOutput = new BinderOutput();
  organizer.organizeCollection(binderOutput);

  const pocketsVM = binderOutput.binder.pockets.map(toPocketViewModel);

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
