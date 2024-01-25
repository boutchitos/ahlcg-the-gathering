import { beforeEach, describe, expect, it } from 'vitest';
import type { Collection } from '$gathering/Collection';
import { CollectionEditor } from './CollectionEditor';
import { PackRepositoryMock } from './PackRepositoryMock';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { CollectionEntity } from '$gathering/CollectionEntity';
import { UnknownPackError } from '$gathering/CollectionEntity/CollectionEntity';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';

class CollectionOutput implements ICollectionOutput {
  collection: Collection = [];

  collectionUpdated(collection: Collection): void {
    this.collection = [...collection];
  }
}

describe('Collection Editor : add/remove pack', () => {
  const packRepository = new PackRepositoryMock();
  let collectionEntity: CollectionEntity;
  let collectionOutput: CollectionOutput;
  let editor: CollectionEditor;

  beforeEach(() => {
    collectionEntity = new CollectionEntity(packRepository);
    collectionOutput = new CollectionOutput();
    // L'output est un peu anonyme (i.e. cache dans ctor, impl); Pourrait etre dans l<interface.
    // editor.listenOnCollection( output ); et serait visible dans le type system, arch diagram
    editor = new CollectionEditor(collectionEntity, collectionOutput);
    editor.resetCollection();
  });

  it('adds one pack to Collection', () => {
    editor.addPack(CoreSet);
    expect(collectionOutput.collection).toEqual([CoreSet]);
  });

  it('may adds same pack more than once', () => {
    editor.addPack(CoreSet);
    editor.addPack(CoreSet);
    expect(collectionOutput.collection).toEqual([CoreSet, CoreSet]);
  });

  it('validates added pack', () => {
    const pack = 'The Bob That Ate Everything';
    expect(() => editor.addPack(pack)).toThrowError(UnknownPackError);
    expect(collectionOutput.collection).toEqual([]);
  });

  it('removes one pack from Collection', () => {
    editor.addPack(CoreSet);
    editor.addPack(Dunwich);
    editor.removePack(CoreSet);
    expect(collectionOutput.collection).toEqual([Dunwich]);
  });

  it('removes only one of many packs from Collection', () => {
    editor.addPack(CoreSet);
    editor.addPack(CoreSet);
    editor.removePack(CoreSet);
    expect(collectionOutput.collection).toEqual([CoreSet]);
  });

  it('removes unexistant pack silently', () => {
    editor.addPack(CoreSet);
    editor.removePack(Dunwich);
    expect(collectionOutput.collection).toEqual([CoreSet]);
  });
});
