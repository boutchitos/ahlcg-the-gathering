import type { IPackRepository } from './IPackRepository';
import type { Pack } from './Pack';

export class CollectionEntity {
  private packs: Pack[] = [];

  constructor(private readonly packRepository: IPackRepository) {}

  addPack(pack: Pack): void {
    validatePack(this.packRepository, pack);
    this.packs.push(pack);
  }

  getPacks(): Pack[] {
    return [...this.packs];
  }

  removePack(pack: Pack): void {
    const idx = this.packs.indexOf(pack);
    if (idx !== -1) {
      // splice here...
      this.packs = [...this.packs.slice(0, idx), ...this.packs.slice(idx + 1)];
    }
  }
}

export class UnknownPackError extends Error {
  constructor(pack: Pack) {
    super(`Unknown pack '${pack}'`);
  }
}

function validatePack(packRepository: IPackRepository, pack: Pack) {
  const packs = [...packRepository.getAllPacks()];
  if (!packs.includes(pack)) {
    throw new UnknownPackError(pack);
  }
}
