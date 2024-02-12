import { beforeEach, expect, it } from 'vitest';
import type { Card } from './ICardsSorter';
import { sortPlayerCards } from './sortPlayerCards';
import { SortPlayerCardsDirectives } from './sorter-config';

let sortDirectives: SortPlayerCardsDirectives;

beforeEach(() => {
  sortDirectives = new SortPlayerCardsDirectives();
});

it('sorts empty cards', () => {
  const cards = sort();
  expect(cards).toEqual([]);
});

it('sorts by names', () => {
  const a = card({ name: 'card 1' });
  const b = card({ name: 'card 2' });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts by names, punctuation ignored', () => {
  const withPunctuation = card({ name: '"Look what I found!"' });
  const without = card({ name: 'Look what I found!' });
  const lucky = card({ name: 'Lucky' });
  expect(sort(lucky, withPunctuation, without)).toEqual([withPunctuation, without, lucky]);
  expect(sort(lucky, without, withPunctuation)).toEqual([without, withPunctuation, lucky]);
});

it('sorts by levels', () => {
  const a = card({ xp: 0 });
  const b = card({ xp: 1 });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts weaknesses at end', () => {
  const w = card({ type_code: 'treachery', subtype_code: 'weakness' });
  const a = card({ type_code: 'asset' });
  const i = card({ type_code: 'investigator' });
  const s = card({ type_code: 'skill' });
  const e = card({ type_code: 'event' });
  expect(sort(w, a, i, s, e)).toEqual([i, a, e, s, w]);
});

it('sorts location at end', () => {
  const l = card({ type_code: 'location' });
  const a = card({ type_code: 'asset' });
  const e = card({ type_code: 'event' });
  const i = card({ type_code: 'investigator' });
  const s = card({ type_code: 'skill' });
  expect(sort(l, s, i, e, a)).toEqual([i, a, e, s, l]);
});

it('sorts by location over by weakness', () => {
  const w = card({ type_code: 'treachery', subtype_code: 'weakness' });
  const l = card({ type_code: 'location' });
  expect(sort(l, w)).toEqual([l, w]);
  expect(sort(w, l)).toEqual([l, w]);
});

it('sorts by classes', () => {
  const cards = sortDirectives.byClassesOrder.sort().map((klass) => card({ faction_code: klass }));

  sortDirectives.byClassesOrder = sortDirectives.byClassesOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by asset slots', () => {
  const cards = sortDirectives.assetsBySlotsOrder.sort().map((slot) => card({ slot }));

  sortDirectives.assetsBySlotsOrder = sortDirectives.assetsBySlotsOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by player cardtypes', () => {
  const cards = sortDirectives.byPlayerCardTypesOrder
    .sort()
    .map((type_code) => card({ type_code }));

  sortDirectives.byPlayerCardTypesOrder = sortDirectives.byPlayerCardTypesOrder.sort().reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts with sorting order', () => {
  const cards: CardInit[] = [];
  cards.push(card({ faction_code: 'guardian', type_code: 'asset' }));
  cards.push(card({ faction_code: 'survivor', type_code: 'investigator' }));
  // assomption: already sorted against test default: by classes, by types
  expect(sort(...cards)).toEqual(cards);

  sortDirectives.sortingOrder = ['by-player-cardtypes', 'by-names', 'by-classes', 'by-levels'];

  // investigator is in front of the guardian asset
  expect(sort(...cards)).toEqual(cards.reverse());
});

type CardInit = {
  faction_code?: string;
  name?: string;
  slot?: string;
  subtype_code?: 'weakness';
  type_code?: string;
  xp?: number;
};

function card({ faction_code, name, slot, subtype_code, type_code, xp }: CardInit): CardInit {
  const typeCode = type_code ?? 'asset';
  return {
    type_code: typeCode,
    faction_code: faction_code ?? 'guardian',
    name: name ?? 'a card',
    slot: slot ?? undefined,
    subtype_code: subtype_code ?? undefined,
    xp: xp ?? 0,
  };
}

function sort(...cards: CardInit[]) {
  return sortPlayerCards(cards as Card[], sortDirectives);
}
