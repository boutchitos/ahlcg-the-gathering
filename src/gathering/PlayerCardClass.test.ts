import { describe, expect, it } from 'vitest';
import { isPlayerCardClasses } from './PlayerCardClass';

describe('isPlayerCardClasses type guard', () => {
  it('detects good classes', () => {
    expect(isPlayerCardClasses('mystic')).toBeTruthy();
  });

  it('rejects bad classes', () => {
    expect(isPlayerCardClasses('moustique')).toBeFalsy();
  });
});
