import { beforeEach, expect, it } from 'vitest';

import type { Card } from './ICardsSorter';
import { SortPlayerCardsDirectives } from './sorter-config';
import { sortPlayerCards } from './sortPlayerCards';
import { CardBuilder, card } from '../test-utils/card';

const cardBuilder = new CardBuilder();

let sortDirectives: SortPlayerCardsDirectives;

beforeEach(() => {
  sortDirectives = new SortPlayerCardsDirectives();
});

it('sorts empty cards', () => {
  const cards = sort();
  expect(cards).toEqual([]);
});

it('sorts by names', () => {
  const a = cardBuilder.asset({ name: 'a' });
  const b = cardBuilder.asset({ name: 'b' });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts by names, punctuation ignored', () => {
  const withPunctuation = cardBuilder.asset({ name: '"Look what I found!"' });
  const without = cardBuilder.asset({ name: 'Look what I found!' });
  const lucky = cardBuilder.asset({ name: 'Lucky' });
  expect(sort(lucky, withPunctuation, without)).toEqual([withPunctuation, without, lucky]);
  expect(sort(lucky, without, withPunctuation)).toEqual([without, withPunctuation, lucky]);
});

it('sorts by levels', () => {
  const a = cardBuilder.asset({ xp: 0 });
  const b = cardBuilder.asset({ xp: 1 });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts location at end', () => {
  const location = cardBuilder.location();
  const asset = cardBuilder.asset();
  const event = cardBuilder.event();
  const investigator = cardBuilder.investigator();
  const skill = cardBuilder.skill();
  expect(sort(location, skill, investigator, event, asset)).toEqual([
    investigator,
    asset,
    event,
    skill,
    location,
  ]);
});

it('sorts by classes', () => {
  const cards = sortDirectives.byClassesOrder
    .sort()
    .map((playerCardClass) => card({ playerCardClass }));

  sortDirectives.byClassesOrder = sortDirectives.byClassesOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by asset slots', () => {
  const cards = sortDirectives.assetsBySlotsOrder.sort().map((slot) => cardBuilder.asset({ slot }));

  sortDirectives.assetsBySlotsOrder = sortDirectives.assetsBySlotsOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by player cardtypes', () => {
  const cards = sortDirectives.byPlayerCardTypesOrder
    .sort()
    .map((playerCardType) => card({ playerCardType }));

  sortDirectives.byPlayerCardTypesOrder = sortDirectives.byPlayerCardTypesOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts with sorting order', () => {
  const cards: Card[] = [];
  cards.push(cardBuilder.asset({ playerCardClass: 'guardian' }));
  cards.push(cardBuilder.investigator({ playerCardClass: 'survivor' }));
  // assomption: already sorted against test default: by classes, by types
  expect(sort(...cards)).toEqual(cards);

  sortDirectives.sortingOrder = ['by-player-cardtypes', 'by-names', 'by-classes', 'by-levels'];

  // investigator is in front of the guardian asset
  expect(sort(...cards)).toEqual(cards.reverse());
});

function sort(...cards: Card[]) {
  return sortPlayerCards(cards, sortDirectives);
}
