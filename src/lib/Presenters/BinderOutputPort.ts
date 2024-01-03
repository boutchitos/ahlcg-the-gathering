import { derived, readable, writable } from 'svelte/store';
import type { Pocket } from '$lib/BinderStorage';
import type { Binder, BinderPage, Pocket as PocketViewModel } from './binder';

export function useBinder(pockets: Pocket[]): Binder {
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
