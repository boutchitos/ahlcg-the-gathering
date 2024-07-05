import { beforeEach, expect, it } from 'vitest';

import { createPackRepository } from '$gathering';
import type { Collection } from '$gathering/Collection';
import { CollectionEditor } from '$gathering/CollectionEditor/CollectionEditor';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import { CollectionLoader } from './CollectionLoader';

const CoreSet = 'Core Set';
const Dunwich = 'The Dunwich Legacy';
const RevisedCoreSet = 'Revised Core Set';

class CollectionOutput implements ICollectionOutput {
  collection: Collection = [];

  collectionUpdated(collection: Collection): void {
    this.collection = [...collection];
  }
}

let collectionOutput: CollectionOutput;
let editor: ICollectionEditor;
let loader: CollectionLoader;

beforeEach(() => {
  const collection = new CollectionEntity(createPackRepository());
  collectionOutput = new CollectionOutput();
  editor = new CollectionEditor(collection, collectionOutput);
  loader = new CollectionLoader(editor);
});

it('loads a collection', () => {
  const provided = [CoreSet, RevisedCoreSet];

  loader.loadCollection([...provided]);

  expect(collectionOutput.collection).toEqual(provided);
});

it('loads another collection additively', () => {
  const provided = [CoreSet, RevisedCoreSet];
  loader.loadCollection([...provided]);

  loader.loadCollection([...provided]);

  expect(howManyCoreSets()).toEqual(2);
});

it('is compatible with Collection Editor', () => {
  const provided = [CoreSet, RevisedCoreSet];
  loader.loadCollection([...provided]);

  editor.addPack(Dunwich);

  expect(collectionOutput.collection.filter((pack) => pack === CoreSet).length).toEqual(1);
  expect(collectionOutput.collection.filter((pack) => pack === Dunwich).length).toEqual(1);
});

function howManyCoreSets() {
  return collectionOutput.collection.filter((pack) => pack === CoreSet).length;
}
