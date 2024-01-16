import type { Collection, IPackRepository, Pack } from '$gathering';

export class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy'];
  }
}

export class UnknownPackError extends Error {
  constructor(pack: Pack) {
    super(`Unknown pack '${pack}'`);
  }
}

export function addPack(packRepo: IPackRepository, collection: Collection, pack: Pack): Collection {
  const packs = [...packRepo.getAllPacks()];
  if (!packs.includes(pack)) {
    throw new UnknownPackError(pack);
  }
  return [...collection, pack];
}
