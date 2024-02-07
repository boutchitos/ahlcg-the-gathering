import type { ICardsSorter } from './ICardsSorter';
import { SortAssetBySlots, type SLOT } from './asset-slots';
import { SortByClasses, type CLASS } from './classes';
import { SortByPlayerCardTypes, type PLAYER_CARD_TYPE } from './player-card-types';

export function sortByClasses(classes: CLASS[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): ICardsSorter {
  return new SortByPlayerCardTypes(types);
}

export function sortAssetsBySlots(slots: SLOT[]): ICardsSorter {
  return new SortAssetBySlots(slots);
}
