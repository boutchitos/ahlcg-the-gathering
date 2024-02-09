import type { ICardsSorter } from './ICardsSorter';
import { SortAssetsBySlots, type SLOT } from './by-asset-slots';
import { SortByClasses, type CLASS } from './by-classes';
import { SortByPlayerCardTypes, type PLAYER_CARD_TYPE } from './by-player-card-types';

export function sortByClasses(classes: CLASS[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByPlayerCardTypes(types: PLAYER_CARD_TYPE[], slots: SLOT[]): ICardsSorter {
  return new SortByPlayerCardTypes(types, sortAssetsBySlots(slots));
}

function sortAssetsBySlots(slots: SLOT[]): ICardsSorter {
  return new SortAssetsBySlots(slots);
}
