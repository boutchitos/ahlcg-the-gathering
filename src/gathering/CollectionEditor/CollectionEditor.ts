import { CollectionEntity, theUserCollection } from '$gathering/CollectionEntity';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { Pack } from '$gathering/Pack';

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

  resetCollection(): void {
    this.collection.reset();
  }
}

export function createCollectionEditor(collectionOutput: ICollectionOutput): ICollectionEditor {
  return new CollectionEditor(theUserCollection, collectionOutput);
}
