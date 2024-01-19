import { beforeEach, describe, expect, it } from 'vitest';
import type { Collection } from '$gathering/Collection';
import { CollectionEditor, UnknownPackError } from './CollectionEditor';
import { PackRepositoryMock } from './PackRepositoryMock';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';

class CollectionOutput implements ICollectionOutput {
  collection: Collection = [];

  collectionUpdated(collection: Collection): void {
    this.collection = [...collection];
  }
}

describe('Collection Editor : add/remove pack', () => {
  const collection: Collection = [];
  const packRepo = new PackRepositoryMock();
  let collectionOutput: CollectionOutput;
  let editor: ICollectionEditor;

  beforeEach(() => {
    collectionOutput = new CollectionOutput();
    editor = new CollectionEditor(packRepo, collectionOutput);
  });

  it('adds one pack to Collection', () => {
    editor.addPack({ collection, pack: CoreSet });
    expect(collectionOutput.collection).toEqual([CoreSet]);

    editor.addPack({ collection: collectionOutput.collection, pack: Dunwich });
    expect(collectionOutput.collection).toEqual([CoreSet, Dunwich]);
  });

  it('may adds more than once', () => {
    editor.addPack({ collection, pack: CoreSet });
    editor.addPack({ collection: collectionOutput.collection, pack: CoreSet });
    expect(collectionOutput.collection).toEqual([CoreSet, CoreSet]);
  });

  it('validates added pack', () => {
    const pack = 'The Bob That Ate Everything';
    expect(() => editor.addPack({ collection, pack })).toThrowError(UnknownPackError);
    expect(collectionOutput.collection).toEqual([]);
  });

  it("adding pack don't mutate the inputted collection", () => {
    editor.addPack({ collection, pack: CoreSet });
    expect(collection).toEqual([]);
  });

  it('removes one pack from Collection', () => {
    const collection = [CoreSet, Dunwich];
    editor.removePack({ collection, pack: CoreSet });
    expect(collectionOutput.collection).toEqual([Dunwich]);
  });

  it('removes only one of many packs from Collection', () => {
    const collection = [CoreSet, CoreSet];
    editor.removePack({ collection, pack: CoreSet });
    expect(collectionOutput.collection).toEqual([CoreSet]);
  });

  it('removes unexistant pack silently', () => {
    editor.addPack({ collection, pack: CoreSet });
    editor.removePack({ collection: collectionOutput.collection, pack: Dunwich });
    expect(collectionOutput.collection).toEqual([CoreSet]);
  });

  it("removing pack don't mutate the inputted collection", () => {
    const collection = [CoreSet];
    editor.removePack({ collection, pack: CoreSet });
    expect(collection).toEqual([CoreSet]);
  });
});
