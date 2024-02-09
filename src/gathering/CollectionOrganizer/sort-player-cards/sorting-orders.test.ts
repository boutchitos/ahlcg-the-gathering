import { describe, expect, it } from 'vitest';
import { DEFAULT_PLAYER_CARDS_SORTING_ORDER, fixPlayerCardsSortingOrder } from './sorting-orders';

describe('fixPlayerCardsSortingOrder', () => {
  it('fixes an empty list', () => {
    expect(fixPlayerCardsSortingOrder([])).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixPlayerCardsSortingOrder(['by-classes'])).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(fixPlayerCardsSortingOrder(['invalid', 'by-player-card-types'])).toEqual(
      DEFAULT_PLAYER_CARDS_SORTING_ORDER,
    );
  });

  it('fixes repeating values', () => {
    const repeating = ['by-classes', 'by-classes'];
    expect(repeating).toHaveLength(DEFAULT_PLAYER_CARDS_SORTING_ORDER.length);
    expect(fixPlayerCardsSortingOrder(repeating)).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = ['by-classes', 'by-player-card-types'].reverse();
    expect(fixPlayerCardsSortingOrder(valid)).toEqual(valid);
  });
});
