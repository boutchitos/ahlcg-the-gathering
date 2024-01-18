import type { Collection } from '$gathering/Collection';
import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';
import type {
  AddPackRequest,
  ICollectionEditor,
  RemovePackRequest,
} from '$gathering/ICollectionEditor';

export class CollectionEditor implements ICollectionEditor {
  constructor(private readonly packRepo: IPackRepository) {}

  addPack({ collection, pack }: AddPackRequest): Collection {
    validatePack(this.packRepo, pack);
    return [...collection, pack];
  }

  removePack({ collection, pack }: RemovePackRequest): Collection {
    const idx = collection.indexOf(pack);
    if (idx === -1) {
      return [...collection];
    }
    return [...collection.slice(0, idx), ...collection.slice(idx + 1)];
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
