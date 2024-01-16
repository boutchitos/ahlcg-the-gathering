import type { Collection, IPackRepository, Pack } from '$gathering';

export class UnknownPackError extends Error {
  constructor(pack: Pack) {
    super(`Unknown pack '${pack}'`);
  }
}

export function addPack(packRepo: IPackRepository, collection: Collection, pack: Pack): Collection {
  validatePack(packRepo, pack);
  return [...collection, pack];
}

export function removePack(collection: Collection, pack: Pack): Collection {
  const idx = collection.indexOf(pack);
  if (idx === -1) {
    return [...collection];
  }
  return [...collection.slice(0, idx), ...collection.slice(idx + 1)];
}

function validatePack(packRepo: IPackRepository, pack: string) {
  const packs = [...packRepo.getAllPacks()];
  if (!packs.includes(pack)) {
    throw new UnknownPackError(pack);
  }
}
