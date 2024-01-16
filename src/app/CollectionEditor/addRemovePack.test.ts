import { describe, expect, test } from 'vitest';
import { addPack } from './addRemovePack';

describe('Collection Editor : add/remove pack', () => {
  const collection: string[] = [];

  test('adds one pack to Collection', () => {
    let updated = addPack(collection, 'Core Set');
    expect(updated).toEqual(['Core Set']);
    updated = addPack(updated, 'The Dunwich Legacy');
    expect(updated).toEqual(['Core Set', 'The Dunwich Legacy']);
  });

  test('may adds more than once', () => {
    let updated = addPack(collection, 'Core Set');
    updated = addPack(updated, 'Core Set');
    expect(updated).toEqual(['Core Set', 'Core Set']);
  });

  test("does't mutate 'collection'", () => {
    addPack(collection, 'Core Set');
    expect(collection).toEqual([]);
  });
});
