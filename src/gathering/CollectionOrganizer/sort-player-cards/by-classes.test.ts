import { describe, expect, it } from 'vitest';
import { toByClasses, DEFAULT_CLASSES } from './by-classes';

describe('toByClasses', () => {
  it('fixes an empty list', () => {
    expect(toByClasses([])).toEqual(DEFAULT_CLASSES);
  });

  it('fixes an incomplete list', () => {
    expect(toByClasses(['guardian'])).toEqual(DEFAULT_CLASSES);
  });

  it('fixes an invalid value', () => {
    expect(
      toByClasses(['invalid', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'multi']),
    ).toEqual(DEFAULT_CLASSES);
  });

  it('fixes repeating values', () => {
    const repeating = ['rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue', 'rogue'];
    expect(repeating).toHaveLength(DEFAULT_CLASSES.length);
    expect(toByClasses(repeating)).toEqual(DEFAULT_CLASSES);
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
    expect(toByClasses(valid)).toEqual(valid);
  });
});
