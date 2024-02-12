import type { Card, ICardsSorter } from './ICardsSorter';

export class SortByNames implements ICardsSorter {
  constructor() {}

  sortCards(a: Card, b: Card): number {
    return a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
  }
}
