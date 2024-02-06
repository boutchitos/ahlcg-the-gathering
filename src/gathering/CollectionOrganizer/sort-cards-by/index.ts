import type { Card } from '$gathering/IBinderOutput';
import type { CLASS, PLAYER_CARD_TYPE, SLOT } from '$gathering/ICollectionOrganizer';
import { SortByClasses } from './classes';
import { SortByPlayerCardTypes } from './player-card-types';
import { SortAssetBySlots } from './asset-slots';

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}

export function sortByClasses(classes: CLASS[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): ICardsSorter {
  return new SortByPlayerCardTypes(types);
}

export function sortAssetsBySlots(slots: SLOT[]): ICardsSorter {
  return new SortAssetBySlots(slots);
}
