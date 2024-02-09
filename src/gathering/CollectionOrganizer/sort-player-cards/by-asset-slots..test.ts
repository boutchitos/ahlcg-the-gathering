import { describe, expect, it } from 'vitest';
import { DEFAULT_ASSET_SLOTS_ORDER, fixAssetsBySlotsOrder } from './by-asset-slots';

describe('fixAssetsBySlotsOrder', () => {
  it('fixes an empty list', () => {
    expect(fixAssetsBySlotsOrder([])).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixAssetsBySlotsOrder(['Accessory'])).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(
      fixAssetsBySlotsOrder([
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

  it('fixes repeating values', () => {
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
    expect(fixAssetsBySlotsOrder(repeating)).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
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
    expect(fixAssetsBySlotsOrder(valid)).toEqual(valid);
  });
});
