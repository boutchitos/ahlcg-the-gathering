import { describe, expect, test } from 'vitest';
import { PackRepository, UnknownPackError, addPack } from './addRemovePack';
import type { Collection } from '$gathering';

describe('Collection Editor : add/remove pack', () => {
  const collection: Collection = [];
  const packRepo = new PackRepository();

  test('adds one pack to Collection', () => {
    let updated = addPack(packRepo, collection, 'Core Set');
    expect(updated).toEqual(['Core Set']);
    updated = addPack(packRepo, updated, 'The Dunwich Legacy');
    expect(updated).toEqual(['Core Set', 'The Dunwich Legacy']);
  });

  test('may adds more than once', () => {
    let updated = addPack(packRepo, collection, 'Core Set');
    updated = addPack(packRepo, updated, 'Core Set');
    expect(updated).toEqual(['Core Set', 'Core Set']);
  });

  test('validates pack', () => {
    const typo = 'The Bob That Ate Everything';
    expect(()=>addPack(packRepo, collection, typo)).toThrowError(UnknownPackError);
  });

  test("does't mutate 'collection'", () => {
    addPack(packRepo, collection, 'Core Set');
    expect(collection).toEqual([]);
  });
});
