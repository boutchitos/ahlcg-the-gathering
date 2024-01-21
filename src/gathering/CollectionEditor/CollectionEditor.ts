import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { Pack } from '$gathering/Pack';

import { CollectionEntity } from '$gathering/CollectionEntity';
import { createPackRepository } from '../PackRepository';

export { UnknownPackError } from '$gathering/CollectionEntity';

export class CollectionEditor implements ICollectionEditor {
  constructor(
    private readonly collection: CollectionEntity,
    private readonly collectionOutput: ICollectionOutput,
  ) {}

  addPack(pack: Pack): void {
    this.collection.addPack(pack);
    this.collectionOutput.collectionUpdated(this.collection.getPacks());
  }

  removePack(pack: Pack): void {
    this.collection.removePack(pack);
    this.collectionOutput.collectionUpdated(this.collection.getPacks());
  }
}

export function createCollectionEditor(collectionOutput: ICollectionOutput) {
  const collection = new CollectionEntity(createPackRepository());
  return new CollectionEditor(collection, collectionOutput);
}
