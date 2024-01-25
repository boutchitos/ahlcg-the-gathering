import { createCollectionEditor } from '$gathering';
import type { Collection } from '$gathering/Collection';
import type { ICollectionEditor } from '$gathering/ICollectionEditor';
import type { ICollectionLoader } from '$gathering/ICollectionLoader';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';

export class CollectionLoader implements ICollectionLoader {
  constructor(private readonly editor: ICollectionEditor) {}

  loadCollection(collection: Collection): void {
    collection.forEach((pack) => {
      this.editor.addPack(pack);
    });
  }
}

export function createCollectionLoader(collectionOutput: ICollectionOutput): ICollectionLoader {
  return new CollectionLoader(createCollectionEditor(collectionOutput));
}
