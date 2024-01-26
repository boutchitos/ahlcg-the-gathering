import type { Collection } from './Collection';

export interface ICollectionLoader {
  loadCollection(collection: Collection): void;
}
