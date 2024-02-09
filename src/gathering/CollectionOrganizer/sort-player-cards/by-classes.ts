import type { Card, ICardsSorter } from './ICardsSorter';
import { Classes, type CLASS } from './PlayerCardClass';

export const DEFAULT_CLASSES = Object.keys(Classes).filter((v) => isNaN(Number(v))) as CLASS[];

export function fixByClasses(wannaBe: string[]): CLASS[] {
  const incoming = new Set(wannaBe.filter((aClass) => DEFAULT_CLASSES.includes(aClass as CLASS)));
  if (incoming.size !== DEFAULT_CLASSES.length) {
    return DEFAULT_CLASSES;
  }
  return wannaBe as CLASS[];
}

export class SortByClasses implements ICardsSorter {
  constructor(private classes: CLASS[]) {}

  sortCards(a: Card, b: Card): number {
    return sortByClasses(a, b, this.classes);
  }
}

function sortByClasses(a: Card, b: Card, classes: CLASS[]): number {
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

function getClassOfPlayerCard(card: Card): CLASS {
  if (card.faction2_code !== undefined) return 'multi';
  return card.faction_code as CLASS;
}
