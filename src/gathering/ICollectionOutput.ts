import type { Collection } from './Collection';

export interface ICollectionOutput {
  collectionUpdated(collection: Collection): void;
}
