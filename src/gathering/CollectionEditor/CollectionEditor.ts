import { CollectionEntity, theUserCollection } from '$gathering/CollectionEntity';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { Pack } from '$gathering/Pack';

export class CollectionEditor implements ICollectionEditor {
  constructor(
    private readonly collection: CollectionEntity,
    private readonly collectionOutput: ICollectionOutput,
  ) {
    this.onCollectionupdated();
  }

  addPack(pack: Pack): void {
    this.collection.addPack(pack);
    this.onCollectionupdated();
  }

  removePack(pack: Pack): void {
    this.collection.removePack(pack);
    this.onCollectionupdated();
  }

  resetCollection(): void {
    this.collection.reset();
    this.onCollectionupdated();
  }

  private onCollectionupdated() {
    this.collectionOutput.collectionUpdated(this.collection.getPacks());
  }
}

export function createCollectionEditor(collectionOutput: ICollectionOutput): ICollectionEditor {
  return new CollectionEditor(theUserCollection, collectionOutput);
}
