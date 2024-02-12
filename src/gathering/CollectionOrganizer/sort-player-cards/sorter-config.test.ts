import { beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_ASSET_SLOTS_ORDER,
  DEFAULT_CLASSES_ORDER,
  DEFAULT_PLAYER_CARDS_SORTING_ORDER,
  DEFAULT_PLAYER_CARDTYPES_ORDER,
  SortPlayerCardsDirectives,
} from './sorter-config';

let directives: SortPlayerCardsDirectives;

beforeEach(() => {
  directives = new SortPlayerCardsDirectives();
});

describe('assetsBySlotsOrder', () => {
  it('fixes an empty list', () => {
    directives.assetsBySlotsOrder = [];
    expect(directives.assetsBySlotsOrder).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an incomplete list', () => {
    const incomplete = ['Accessory'];
    directives.assetsBySlotsOrder = incomplete;
    expect(directives.assetsBySlotsOrder).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
  });

  it('fixes an invalid value', () => {
    const invalid = [
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
    ];
    directives.assetsBySlotsOrder = invalid;
    expect(directives.assetsBySlotsOrder).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
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
    directives.assetsBySlotsOrder = repeating;
    expect(repeating).toHaveLength(DEFAULT_ASSET_SLOTS_ORDER.length);
    expect(directives.assetsBySlotsOrder).toEqual(DEFAULT_ASSET_SLOTS_ORDER);
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
    directives.assetsBySlotsOrder = valid;
    expect(directives.assetsBySlotsOrder).toEqual(valid);
  });
});

describe('byClassesOrder', () => {
  it('fixes an empty list', () => {
    directives.byClassesOrder = [];
    expect(directives.byClassesOrder).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an incomplete list', () => {
    const incomplete = ['guardian'];
    directives.byClassesOrder = incomplete;
    expect(directives.byClassesOrder).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an invalid value', () => {
    const invalid = ['invalid', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi'];
    directives.byClassesOrder = invalid;
    expect(directives.byClassesOrder).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes repeating values', () => {
    const repeating = ['rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue'];
    directives.byClassesOrder = repeating;
    expect(repeating).toHaveLength(DEFAULT_CLASSES_ORDER.length);
    expect(directives.byClassesOrder).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = [
      'guardian',
      'mystic',
      'rogue',
      'seeker',
      'survivor',
      'neutral',
      'multi',
    ].reverse();
    directives.byClassesOrder = valid;
    expect(directives.byClassesOrder).toEqual(valid);
  });
});

describe('byPlayerCardTypesOrder', () => {
  it('fixes an empty list', () => {
    directives.byPlayerCardTypesOrder = [];
    expect(directives.byPlayerCardTypesOrder).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an incomplete list', () => {
    const incomplete = ['investigator'];
    directives.byPlayerCardTypesOrder = incomplete;
    expect(directives.byPlayerCardTypesOrder).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes an invalid value', () => {
    const invalid = ['invalid', 'asset', 'event', 'skill'];
    directives.byPlayerCardTypesOrder = invalid;
    expect(directives.byPlayerCardTypesOrder).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('fixes repeating values', () => {
    const repeating = ['investigator', 'investigator', 'investigator', 'investigator'];
    directives.byPlayerCardTypesOrder = repeating;
    expect(repeating).toHaveLength(DEFAULT_PLAYER_CARDTYPES_ORDER.length);
    expect(directives.byPlayerCardTypesOrder).toEqual(DEFAULT_PLAYER_CARDTYPES_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = ['investigator', 'asset', 'event', 'skill'].reverse();
    directives.byPlayerCardTypesOrder = valid;
    expect(directives.byPlayerCardTypesOrder).toEqual(valid);
  });
});

describe('sortingOrder', () => {
  it('fixes an empty list', () => {
    directives.sortingOrder = [];
    expect(directives.sortingOrder).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('fixes an incomplete list', () => {
    const incomplete = ['by-classes'];
    directives.sortingOrder = incomplete;
    expect(directives.sortingOrder).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('fixes an invalid value', () => {
    const invalid = ['invalid', 'by-player-cardtypes'];
    directives.sortingOrder = invalid;
    expect(directives.sortingOrder).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('fixes repeating values', () => {
    const repeating = ['by-classes', 'by-classes', 'by-classes'];
    directives.sortingOrder = repeating;
    expect(repeating).toHaveLength(DEFAULT_PLAYER_CARDS_SORTING_ORDER.length);
    expect(directives.sortingOrder).toEqual(DEFAULT_PLAYER_CARDS_SORTING_ORDER);
  });

  it('accepts a valid list', () => {
    const valid = ['by-classes', 'by-names', 'by-player-cardtypes'].reverse();
    directives.sortingOrder = valid;
    expect(directives.sortingOrder).toEqual(valid);
  });
});
