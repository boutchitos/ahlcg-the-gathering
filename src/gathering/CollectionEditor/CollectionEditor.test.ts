import { describe, expect, it } from 'vitest';
import type { Collection } from '$gathering/Collection';
import { CollectionEditor, UnknownPackError } from './CollectionEditor';
import { PackRepositoryMock } from './PackRepositoryMock';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';

describe('Collection Editor : add/remove pack', () => {
  const collection: Collection = [];
  const packRepo = new PackRepositoryMock();
  const editor = new CollectionEditor(packRepo);

  it('adds one pack to Collection', () => {
    let updated = editor.addPack({ collection, pack: CoreSet });
    expect(updated).toEqual([CoreSet]);
    updated = editor.addPack({ collection: updated, pack: Dunwich });
    expect(updated).toEqual([CoreSet, Dunwich]);
  });

  it('may adds more than once', () => {
    let updated = editor.addPack({ collection, pack: CoreSet });
    updated = editor.addPack({ collection: updated, pack: CoreSet });
    expect(updated).toEqual([CoreSet, CoreSet]);
  });

  it('validates added pack', () => {
    const pack = 'The Bob That Ate Everything';
    expect(() => editor.addPack({ collection, pack })).toThrowError(UnknownPackError);
  });

  it("adding pack don't mutate the inputted collection", () => {
    editor.addPack({ collection, pack: CoreSet });
    expect(collection).toEqual([]);
  });

  it('removes one pack from Collection', () => {
    const collection = [CoreSet, Dunwich];
    const updated = editor.removePack({ collection, pack: CoreSet });
    expect(updated).toEqual([Dunwich]);
  });

  it('removes only one of many packs from Collection', () => {
    const collection = [CoreSet, CoreSet];
    const updated = editor.removePack({ collection, pack: CoreSet });
    expect(updated).toEqual([CoreSet]);
  });

  it('removes unexistant pack silently', () => {
    const collection = [CoreSet];
    const updated = editor.removePack({ collection, pack: Dunwich });
    expect(updated).toEqual([CoreSet]);
  });

  it("removing pack don't mutate the inputted collection", () => {
    const collection = [CoreSet];
    editor.removePack({ collection, pack: CoreSet });
    expect(collection).toEqual([CoreSet]);
  });
});
