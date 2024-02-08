import { beforeEach, expect, it } from 'vitest';
import { sortPlayerCards } from '.';
import type { Card } from '$gathering/IBinderOutput';
import type { CLASS, PLAYER_CARDS_SORTER, PLAYER_CARD_TYPE, SLOT } from './sorter-config';

let assetSlots: SLOT[];
let classes: CLASS[];
let playerCardTypes: PLAYER_CARD_TYPE[];
let sortingOrder: PLAYER_CARDS_SORTER[];

beforeEach(() => {
  assetSlots = [
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
  classes = ['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi'];
  playerCardTypes = ['investigator', 'asset', 'event', 'skill'];
  sortingOrder = ['by-classes', 'by-player-card-types'];
});

it('sorts empty cards', () => {
  const cards = sort();
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
  const cards = classes.sort().map((klass) => card({ faction_code: klass }));

  classes.reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by asset slots', () => {
  const cards = assetSlots.sort().map((slot) => card({ slot }));

  assetSlots.reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts by player card types', () => {
  const cards = playerCardTypes.sort().map((type_code) => card({ type_code }));

  playerCardTypes.reverse();

  expect(sort(...cards)).toEqual(cards.reverse());
});

it('sorts with sorting order', () => {
  const cards: CardInit[] = [];
  cards.push(card({ faction_code: 'guardian', type_code: 'asset' }));
  cards.push(card({ faction_code: 'survivor', type_code: 'investigator' }));
  // assomption: already sorted against test default: by classes, by types, by slots
  expect(sort(...cards)).toEqual(cards);

  sortingOrder = ['by-player-card-types', 'by-classes'];

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
  return sortPlayerCards(cards as Card[], { assetSlots, classes, playerCardTypes, sortingOrder });
}
