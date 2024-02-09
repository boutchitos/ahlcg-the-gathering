import type { Card, ICardsSorter } from './ICardsSorter';
import { PlayerCardClasses, type PlayerCardClass } from './PlayerCardClass';

export const DEFAULT_CLASSES_ORDER = Object.keys(PlayerCardClasses).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardClass[];

export function fixByClasses(wannaBe: string[]): PlayerCardClass[] {
  const incoming = new Set(
    wannaBe.filter((aClass) => DEFAULT_CLASSES_ORDER.includes(aClass as PlayerCardClass)),
  );
  if (incoming.size !== DEFAULT_CLASSES_ORDER.length) {
    return DEFAULT_CLASSES_ORDER;
  }
  return wannaBe as PlayerCardClass[];
}

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
  if (card.faction2_code !== undefined) return 'multi';
  return card.faction_code as PlayerCardClass;
}
