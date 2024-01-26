import { beforeEach, expect, it } from 'vitest';
import type { Collection } from '$gathering/Collection';
import { CollectionEditor } from './CollectionEditor';
import { PackRepositoryMock } from './PackRepositoryMock';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { CollectionEntity } from '$gathering/CollectionEntity';
import { UnknownPackError } from '$gathering/CollectionEntity/CollectionEntity';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';

class CollectionOutput implements ICollectionOutput {
  public hasBeenUpdated: boolean = false;

  collection: Collection = [];

  collectionUpdated(collection: Collection): void {
    this.hasBeenUpdated = true;
    this.collection = [...collection];
  }
}

let collectionEntity: CollectionEntity;
let collectionOutput: CollectionOutput;
let editor: CollectionEditor;

beforeEach(() => {
  collectionEntity = new CollectionEntity(new PackRepositoryMock());
  collectionOutput = new CollectionOutput();
  // L'output est un peu anonyme (i.e. cache dans ctor, impl); Pourrait etre dans l<interface.
  // editor.listenOnCollection( output ); et serait visible dans le type system, arch diagram
  editor = new CollectionEditor(collectionEntity, collectionOutput);
});

it('outputs its collection at instantiation time', () => {
  expect(collectionOutput.hasBeenUpdated).toStrictEqual(true);
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

it('resets collection', () => {
  editor.addPack(CoreSet);

  editor.resetCollection();

  expect(collectionOutput.collection).toEqual([]);
});
