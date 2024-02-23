import type { Card, ICardsSorter } from './ICardsSorter';
import type { PlayerCardClass } from './PlayerCardClass';

export class SortByClasses implements ICardsSorter {
  constructor(private classes: PlayerCardClass[]) {}

  sortCards(a: Card, b: Card): number {
    return sortByClasses(a, b, this.classes);
  }
}

function sortByClasses(a: Card, b: Card, classes: PlayerCardClass[]): number {
  const aClass = classes.indexOf(getClassOfPlayerCard(a));
  if (aClass === -1) {
    throw new Error(`unknown faction_code ${a.faction_code}`);
  }

  const bClass = classes.indexOf(getClassOfPlayerCard(b));
  if (bClass === -1) {
    throw new Error(`unknown faction_code ${b.faction_code}`);
  }

  return aClass - bClass;
}

function getClassOfPlayerCard(card: Card): PlayerCardClass {
  if (isWeaknessCard(card)) return 'basic weakness';
  if (card.faction2_code !== undefined) return 'multi';
  return card.faction_code as PlayerCardClass;
}

function isWeaknessCard(card: Card) {
  const enemy = card.type_code === 'enemy';
  const weakness = card.subtype_code?.includes('weakness');
  return enemy || weakness;
}
