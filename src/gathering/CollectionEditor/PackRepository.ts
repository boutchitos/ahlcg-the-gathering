import type { IPackRepository, Pack } from '$gathering';

export class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy'];
  }
}
