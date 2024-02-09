import { describe, expect, it } from 'vitest';
import { DEFAULT_ASSET_SLOTS_ORDER, fixAssetsBySlots } from './by-asset-slots';

describe('fixAssetsBySlots', () => {
  it('fixes an empty list', () => {
    expect(fixAssetsBySlots([])).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixAssetsBySlots(['Accessory'])).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(
      fixAssetsBySlots([
        'invalid',
        'Ally. Arcane',
        'Ally',
        'Arcane x2',
        'Arcane',
        'Body. Arcane',
        'Body. Hand x2',
        'Body',
        'Hand x2. Arcane',
        'Hand x2',
        'Hand. Arcane',
        'Hand',
        'Tarot',
        '-no-slot-',
      ]),
    ).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it.only('fixes repeating values', () => {
    const repeating = [
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
      'Ally',
    ];
    expect(repeating).toHaveLength(DEFAULT_ASSET_SLOTS_ORDER.length);
    expect(fixAssetsBySlots(repeating)).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = [
      'Accessory',
      'Ally. Arcane',
      'Ally',
      'Arcane x2',
      'Arcane',
      'Body. Arcane',
      'Body. Hand x2',
      'Body',
      'Hand x2. Arcane',
      'Hand x2',
      'Hand. Arcane',
      'Hand',
      'Tarot',
      '-no-slot-',
    ].reverse();
    expect(fixAssetsBySlots(valid)).toEqual(valid);
  });
});
