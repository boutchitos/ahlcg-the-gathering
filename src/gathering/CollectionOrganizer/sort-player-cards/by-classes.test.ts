import { describe, expect, it } from 'vitest';
import { fixByClassesOrder, DEFAULT_CLASSES_ORDER } from './by-classes';

describe('fixByClassesOrder', () => {
  it('fixes an empty list', () => {
    expect(fixByClassesOrder([])).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixByClassesOrder(['guardian'])).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(
      fixByClassesOrder(['invalid', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi']),
    ).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes repeating values', () => {
    const repeating = ['rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue'];
    expect(repeating).toHaveLength(DEFAULT_CLASSES_ORDER.length);
    expect(fixByClassesOrder(repeating)).toEqual(DEFAULT_CLASSES_ORDER);
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
    expect(fixByClassesOrder(valid)).toEqual(valid);
  });
});
