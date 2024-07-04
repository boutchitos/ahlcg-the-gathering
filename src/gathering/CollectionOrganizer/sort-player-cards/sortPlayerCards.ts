import type { Card, ICardsSorter } from './ICardsSorter';
import type { PlayerCardsSorter } from '$gathering/PlayerCardsSorter';
import type { SortPlayerCardsDirectives } from './sorter-config';
import { sortByClasses, sortByLevels, sortByNames, sortByPlayerCardTypes } from './sorters';

export function sortPlayerCards(
  cards: Iterable<Card>,
  sortDirectives: SortPlayerCardsDirectives,
): Card[] {
  const availSorters: Record<PlayerCardsSorter, ICardsSorter> = {
    'by-classes': sortByClasses(sortDirectives.byClassesOrder),
    'by-levels': sortByLevels(),
    'by-names': sortByNames(),
    'by-player-cardtypes': sortByPlayerCardTypes(
      sortDirectives.byPlayerCardTypesOrder,
      sortDirectives.assetsBySlotsOrder,
    ),
  };
  const cardsSorters = sortDirectives.sortingOrder.map((sorter) => availSorters[sorter]);

  const cardSorter = (a: Card, b: Card) => sortCards(a, b, cardsSorters);
  return [...cards].sort(cardSorter);
}

function sortCards(a: Card, b: Card, sorters: ICardsSorter[]) {
  // I would put locations here after weakness, probably
  // investigator cards that are catched up by pocket regrouping.
  // yup for now : Luke Robinson
  const bylocations = sortPlayerCardsByLocation(a, b);
  if (bylocations !== 0) return bylocations;

  if (!a.location) {
    for (const sorter of sorters) {
      const result = sorter.sortCards(a, b);
      if (result !== 0) return result;
    }
  }

  return 0;
}

function sortPlayerCardsByLocation(a: Card, b: Card): number {
  const aIsLocation = a.location;
  const bIsLocation = b.location;

  if (aIsLocation !== bIsLocation) {
    return aIsLocation ? 1 : -1; // location at the end
  }

  return 0;
}
