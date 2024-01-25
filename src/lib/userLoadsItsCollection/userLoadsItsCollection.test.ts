import { beforeEach, expect, it } from 'vitest';
import { userLoadsItsCollection } from './userLoadsItsCollection';
import type { Collection } from '$gathering/Collection';

// let ahtcgBundle: BundleOfPacks;
// let coreSet: CardsPack;
// let howManyCoreSet: number;

beforeEach(() => {});

it('provides its collection', () => {
  const collection: Collection = ['Core Set', 'Revised Core Set', 'Core Set'];
  userLoadsItsCollection(collection);
});
