import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';
import ahdbPacks from './ahdb.packs.json';

export function createPackRepository(): IPackRepository {
  return thePackRepository;
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ahdbPacks.map((pack) => pack.name);
  }
}

// no need to get many instance of static data.
const thePackRepository = new PackRepository();
