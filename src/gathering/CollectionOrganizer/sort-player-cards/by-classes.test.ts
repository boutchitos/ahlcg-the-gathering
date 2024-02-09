import { describe, expect, it } from 'vitest';
import { fixByClasses, DEFAULT_CLASSES_ORDER } from './by-classes';

describe('fixByClasses', () => {
  it('fixes an empty list', () => {
    expect(fixByClasses([])).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an incomplete list', () => {
    expect(fixByClasses(['guardian'])).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes an invalid value', () => {
    expect(
      fixByClasses(['invalid', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi']),
    ).toEqual(DEFAULT_CLASSES_ORDER);
  });

  it('fixes repeating values', () => {
    const repeating = ['rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue'];
    expect(repeating).toHaveLength(DEFAULT_CLASSES_ORDER.length);
    expect(fixByClasses(repeating)).toEqual(DEFAULT_CLASSES_ORDER);
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
    expect(fixByClasses(valid)).toEqual(valid);
  });
});
