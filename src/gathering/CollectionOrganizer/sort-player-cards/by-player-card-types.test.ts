import { describe, expect, it } from 'vitest';
import { DEFAULT_PLAYER_CARDTYPES_ORDER, fixByPlayerCardtypes } from './by-player-card-types';

describe('fixByPlayerCardtypes', () => {
  it('fixes an empty list', () => {
    expect(fixByPlayerCardtypes([])).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixByPlayerCardtypes(['investigator'])).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(fixByPlayerCardtypes(['invalid', 'asset', 'event', 'skill'])).toEqual(
      DEFAULT_PLAYER_CARDTYPES_ORDER,
    );
  });

  it('fixes repeating values', () => {
    const repeating = ['investigator', 'investigator', 'investigator', 'investigator'];
    expect(repeating).toHaveLength(DEFAULT_PLAYER_CARDTYPES_ORDER.length);
    expect(fixByPlayerCardtypes(repeating)).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = ['investigator', 'asset', 'event', 'skill'].reverse();
    expect(fixByPlayerCardtypes(valid)).toEqual(valid);
  });
});
