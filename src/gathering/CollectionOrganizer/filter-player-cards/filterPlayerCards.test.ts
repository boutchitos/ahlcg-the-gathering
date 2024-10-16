import { beforeEach, expect, it } from 'vitest';

import { card } from '../test-utils/card';
import { availablePlayerCardClasses } from '$gathering/PlayerCardClass';
import { filterPlayerCards } from './filterPlayerCards';
import type { Card } from '$gathering/Card';

const allClassesCards = availablePlayerCardClasses.map((playerCardClass) =>
  card({ playerCardClass }),
);
const emptyCards: Card[] = [];

beforeEach(() => {
  expect(allClassesCards).toHaveLength(8);
  expect(emptyCards).toHaveLength(0);
});

it('filters empty cards', () => {
  expect(filterPlayerCards(emptyCards, [])).toEqual([]);
  expect(filterPlayerCards(emptyCards, ['guardian'])).toEqual([]);
});

it('filters cards with one class', () => {
  expect(filterPlayerCards(allClassesCards, ['guardian'])).toHaveLength(1);
});

it('filters cards including many classes', () => {
  expect(filterPlayerCards(allClassesCards, ['guardian', 'rogue'])).toHaveLength(2);
});

it("doesn't filter cards when no classes are provided", () => {
  expect(filterPlayerCards(allClassesCards, [])).toHaveLength(8);
});
