import type { Collection, Pack } from '$gathering';

export class PackRepository {
  getAllPacks(): Array<Pack> {
    return ['Core Set'];
  }
}

export function addPack(packRepo: PackRepository, collection: Collection, pack: Pack): Collection {
  const packs = packRepo.getAllPacks();
  if (!packs.includes(pack)) {
    console.log('la chu fache');
  }
  return [...collection, pack];
}
