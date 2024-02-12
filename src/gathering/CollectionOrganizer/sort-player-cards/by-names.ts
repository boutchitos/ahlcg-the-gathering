import type { Card, ICardsSorter } from './ICardsSorter';

export class SortByNames implements ICardsSorter {
  constructor() {}

  sortCards(a: Card, b: Card): number {
    const result = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
    if (result !== 0) return result;

    return 0;
  }
}
