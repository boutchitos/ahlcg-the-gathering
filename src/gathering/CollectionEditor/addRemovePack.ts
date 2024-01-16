import type { Collection, Pack } from '$gathering';

export class PackRepository {
  getAllPacks(): Array<Pack> {
    return ['Core Set', 'The Dunwich Legacy'];
  }
}

export class UnknownPackError extends Error {
  
}

export function addPack(packRepo: PackRepository, collection: Collection, pack: Pack): Collection {
  const packs = packRepo.getAllPacks();
  if (!packs.includes(pack)) {
    throw new UnknownPackError("bad bad bad");
  }
  return [...collection, pack];
}
