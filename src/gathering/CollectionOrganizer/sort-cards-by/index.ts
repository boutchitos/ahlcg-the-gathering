import type { Card } from '$gathering/IBinderOutput';
import type { CLASS, SLOT } from '$gathering/ICollectionOrganizer';
import { SortAssetBySlots as SortAssetsBySlots } from './asset-slots';
import { SortByClasses } from './classes';

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}

export function sortAssetsBySlots(slots: SLOT[]): ICardsSorter {
  return new SortAssetsBySlots(slots);
}

export function sortByClasses(classes: CLASS[]): ICardsSorter {
  return new SortByClasses(classes);
}
