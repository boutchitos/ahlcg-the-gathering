import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';

export class PackRepositoryMock implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy'];
  }
}
