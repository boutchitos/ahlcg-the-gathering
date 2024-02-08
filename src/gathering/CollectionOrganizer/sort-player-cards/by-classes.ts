import type { Card, ICardsSorter } from './ICardsSorter';

export type CLASS = 'guardian' | 'mystic' | 'rogue' | 'seeker' | 'survivor' | 'neutral' | 'multi';

export class SortByClasses implements ICardsSorter {
  constructor(private classes: CLASS[]) {}

  sortCards(a: Card, b: Card): number {
    return sortByClasses(a, b, this.classes);
  }
}

function sortByClasses(a: Card, b: Card, classes: CLASS[]): number {
  const aClass = classes.indexOf(toClasses(a));
  if (aClass === -1) {
    throw new Error(`unknown faction_code ${a.faction_code}`);
  }

  const bClass = classes.indexOf(toClasses(b));
  if (bClass === -1) {
    throw new Error(`unknown faction_code ${b.faction_code}`);
  }

  return aClass - bClass;
}

function toClasses(card: Card): CLASS {
  if (card.faction2_code !== undefined) return 'multi';
  return card.faction_code as CLASS;
}
