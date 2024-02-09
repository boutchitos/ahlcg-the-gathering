import { describe, expect, it } from 'vitest';
import { DEFAULT_PLAYER_CARDTYPES_ORDER, fixByPlayerCardtypesOrder } from './by-player-card-types';

describe('fixByPlayerCardtypesOrder', () => {
  it('fixes an empty list', () => {
    expect(fixByPlayerCardtypesOrder([])).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixByPlayerCardtypesOrder(['investigator'])).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(fixByPlayerCardtypesOrder(['invalid', 'asset', 'event', 'skill'])).toEqual(
      DEFAULT_PLAYER_CARDTYPES_ORDER,
    );
  });

  it('fixes repeating values', () => {
    const repeating = ['investigator', 'investigator', 'investigator', 'investigator'];
    expect(repeating).toHaveLength(DEFAULT_PLAYER_CARDTYPES_ORDER.length);
    expect(fixByPlayerCardtypesOrder(repeating)).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = ['investigator', 'asset', 'event', 'skill'].reverse();
    expect(fixByPlayerCardtypesOrder(valid)).toEqual(valid);
  });
});
