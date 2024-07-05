import type { Card } from '$gathering/Card';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';
import type { ICardsSorter } from './ICardsSorter';

export class SortByClasses implements ICardsSorter {
  constructor(private classesOrder: PlayerCardClass[]) {}

  sortCards(a: Card, b: Card): number {
    const aClass = this.classesOrder.indexOf(a.playerCardClass);
    const bClass = this.classesOrder.indexOf(b.playerCardClass);
    return aClass - bClass;
  }
}
