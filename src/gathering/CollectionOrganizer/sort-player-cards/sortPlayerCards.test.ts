import { beforeEach, expect, it } from 'vitest';
import { sortPlayerCards } from '.';
import type { CLASS, Card, PLAYER_CARD_TYPE, SLOT } from './ICardsSorter';

const classes: CLASS[] = ['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi'];
const playerCardTypes: PLAYER_CARD_TYPE[] = ['investigator', 'asset', 'event', 'skill'];
const assetSlots: SLOT[] = [
  'Arcane',
  'Arcane x2',
  'Hand',
  'Hand x2',
  'Hand. Arcane',
  'Hand x2. Arcane',
  'Ally',
  'Ally. Arcane',
  'Accessory',
  'Body',
  'Body. Arcane',
  'Body. Hand x2',
  'Tarot',
  undefined,
];

beforeEach(() => {
  classes.sort();
});

it('sorts empty cards', () => {
  const cards = sortPlayerCards([], { assetSlots, classes, playerCardTypes });
  expect(cards).toEqual([]);
});

it('sorts by name', () => {
  const a = card({ name: 'card 1' });
  const b = card({ name: 'card 2' });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts by xp', () => {
  const a = card({ xp: 0 });
  const b = card({ xp: 1 });
  expect(sort(a, b)).toEqual([a, b]);
  expect(sort(b, a)).toEqual([a, b]);
});

it('sorts by name over xp', () => {
  const a0 = card({ name: 'card 1', xp: 0 });
  const a1 = card({ name: 'card 1', xp: 1 });
  const b0 = card({ name: 'card 2', xp: 0 });
  const b1 = card({ name: 'card 2', xp: 1 });
  expect(sort(b1, b0, a1, a0)).toEqual([a0, a1, b0, b1]);
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
  const i = card({ type_code: 'investigator' });
  const s = card({ type_code: 'skill' });
  const e = card({ type_code: 'event' });
  expect(sort(l, a, i, s, e)).toEqual([i, a, e, s, l]);
});

it('sorts by location over by weakness', () => {
  const w = card({ type_code: 'treachery', subtype_code: 'weakness' });
  const l = card({ type_code: 'location' });
  expect(sort(l, w)).toEqual([l, w]);
  expect(sort(w, l)).toEqual([l, w]);
});

it('sorts by classes', () => {
  const cards = ['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi']
    .sort()
    .map((klass) => card({ faction_code: klass }));

  classes.reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

type CardInit = {
  faction_code?: string;
  name?: string;
  type_code?: string;
  subtype_code?: 'weakness';
  xp?: number;
};

function card({ type_code, faction_code, name, subtype_code, xp }: CardInit): CardInit {
  return {
    type_code: type_code ?? 'asset',
    faction_code: faction_code ?? 'guardian',
    name: name ?? 'a card',
    subtype_code: subtype_code ?? undefined,
    xp: xp ?? 0,
  };
}

function sort(...cards: CardInit[]) {
  return sortPlayerCards(cards as Card[], { assetSlots, classes, playerCardTypes });
}
