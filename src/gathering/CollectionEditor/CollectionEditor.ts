import { CollectionEntity } from '$gathering/CollectionEntity';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';
import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';

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
  const collection = new CollectionEntity(new PackRepository());
  return new CollectionEditor(collection, collectionOutput);
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy', 'Revised Core Set'];
  }
}
