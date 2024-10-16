import { beforeEach, expect, it } from 'vitest';

import { card } from '../test-utils/card';
import { availablePlayerCardClasses } from '$gathering/PlayerCardClass';
import { classifyPlayerCards } from './classifyPlayerCards';
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
  expect(classifyPlayerCards(emptyCards, [])).toEqual([]);
  expect(classifyPlayerCards(emptyCards, ['guardian'])).toEqual([]);
});

it('filters cards with one class', () => {
  expect(classifyPlayerCards(allClassesCards, ['guardian'])).toHaveLength(1);
});

it('filters cards including many classes', () => {
  expect(classifyPlayerCards(allClassesCards, ['guardian', 'rogue'])).toHaveLength(2);
});

it("doesn't filter cards when no classes are provided", () => {
  expect(classifyPlayerCards(allClassesCards, [])).toHaveLength(8);
});
