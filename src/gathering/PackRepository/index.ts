import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';

export function createPackRepository() {
  return new PackRepository();
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy', 'Revised Core Set'];
  }
}
