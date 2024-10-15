import { beforeEach, expect, it } from 'vitest';

import { card } from '../test-utils/card';
import { availablePlayerCardClasses } from '$gathering/PlayerCardClass';
import { filterPlayerCards } from './filterPlayerCards';


const cards = availablePlayerCardClasses.map((playerCardClass) => card({ playerCardClass }));

beforeEach(() => {
  expect(cards).toHaveLength(8);
});

it('filters empty cards', () => {
  expect(filterPlayerCards([], 'guardian')).toEqual([]);
});

it('filters cards with a class', () => {
  expect(filterPlayerCards(cards, 'guardian')).toHaveLength(1);
});

// maybe temporary to let other tests pass, also to keep this open, and not only "binder" oriendted.
it('filters cards by classes, if provided', () => {
  expect(filterPlayerCards(cards, undefined)).toHaveLength(8);
});
