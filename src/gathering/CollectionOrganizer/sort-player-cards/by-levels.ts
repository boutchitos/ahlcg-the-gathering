import type { Card, ICardsSorter } from './ICardsSorter';

export class SortByLevels implements ICardsSorter {
  constructor() {}

  sortCards(a: Card, b: Card): number {
    return (a.xp ?? 0) - (b.xp ?? 0);
  }
}
