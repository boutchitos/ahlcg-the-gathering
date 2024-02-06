import type { Card } from '$gathering/IBinderOutput';
import type { CLASS } from '$gathering/ICollectionOrganizer';
import { SortByClasses } from './classes';

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}

export function sortByClasses(classes: CLASS[]) {
  return new SortByClasses(classes);
}
