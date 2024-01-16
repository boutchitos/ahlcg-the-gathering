import type { IPackRepository, Pack } from '$gathering';

export class PackRepositoryMock implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return ['Core Set', 'The Dunwich Legacy'];
  }
}
