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

function validatePack(packRepo: IPackRepository, pack: string) {
  const packs = [...packRepo.getAllPacks()];
  if (!packs.includes(pack)) {
    throw new UnknownPackError(pack);
  }
}
