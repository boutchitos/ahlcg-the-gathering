import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';
import type {
  AddPackRequest,
  ICollectionEditor,
  RemovePackRequest,
} from '$gathering/ICollectionEditor';
import type { ICollectionOutput } from '$gathering/ICollectionOutput';

export class CollectionEditor implements ICollectionEditor {
  constructor(
    private readonly packRepo: IPackRepository,
    private readonly collectionOutput: ICollectionOutput,
  ) {}

  addPack({ collection, pack }: AddPackRequest): void {
    validatePack(this.packRepo, pack);
    this.collectionOutput.collectionUpdated([...collection, pack]);
  }

  removePack({ collection, pack }: RemovePackRequest): void {
    const idx = collection.indexOf(pack);
    if (idx !== -1) {
      this.collectionOutput.collectionUpdated([
        ...collection.slice(0, idx),
        ...collection.slice(idx + 1),
      ]);
    }
  }
}

export class UnknownPackError extends Error {
  constructor(pack: Pack) {
    super(`Unknown pack '${pack}'`);
  }
}

function validatePack(packRepo: IPackRepository, pack: Pack) {
  const packs = [...packRepo.getAllPacks()];
  if (!packs.includes(pack)) {
    throw new UnknownPackError(pack);
  }
}
