import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';

export function createPackRepository(): IPackRepository {
  return thePackRepository;
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy', 'Revised Core Set'];
  }
}

// no need to get many instance of static data.
const thePackRepository = new PackRepository();
