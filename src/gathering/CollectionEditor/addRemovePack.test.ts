import { describe, expect, it } from 'vitest';
import { UnknownPackError, addPack, removePack } from './addRemovePack';
import type { Collection } from '$gathering';
import { PackRepository } from './PackRepository';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';

describe('Collection Editor : add/remove pack', () => {
  const collection: Collection = [];
  const packRepo = new PackRepository();

  it('adds one pack to Collection', () => {
    let updated = addPack(packRepo, collection, CoreSet);
    expect(updated).toEqual([CoreSet]);
    updated = addPack(packRepo, updated, Dunwich);
    expect(updated).toEqual([CoreSet, Dunwich]);
  });

  it('may adds more than once', () => {
    let updated = addPack(packRepo, collection, CoreSet);
    updated = addPack(packRepo, updated, CoreSet);
    expect(updated).toEqual([CoreSet, CoreSet]);
  });

  it('validates added pack', () => {
    const typo = 'The Bob That Ate Everything';
    expect(() => addPack(packRepo, collection, typo)).toThrowError(UnknownPackError);
  });

  it("adding pack don't mutate the inputted collection", () => {
    addPack(packRepo, collection, CoreSet);
    expect(collection).toEqual([]);
  });

  it('removes one pack from Collection', () => {
    const collection = [CoreSet, Dunwich];
    const updated = removePack(collection, CoreSet);
    expect(updated).toEqual([Dunwich]);
  });

  it('removes only one of many packs from Collection', () => {
    const collection = [CoreSet, CoreSet];
    const updated = removePack(collection, CoreSet);
    expect(updated).toEqual([CoreSet]);
  });

  it('removes unexistant pack silently', () => {
    const collection = [CoreSet];
    const updated = removePack(collection, Dunwich);
    expect(updated).toEqual([CoreSet]);
  });

  it("removing pack don't mutate the inputted collection", () => {
    const collection = [CoreSet];
    removePack(collection, CoreSet);
    expect(collection).toEqual([CoreSet]);
  });
});
