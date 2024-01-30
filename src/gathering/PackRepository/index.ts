import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';
import ahdbPacks from './ahdb.packs.json';

export function createPackRepository(): IPackRepository {
  return thePackRepository;
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    const ahdb = ahdbPacks.map((pack) => pack.name);
    // those packs are also supported
    const emulated = [
      'The Circle Undone Campaign Expansion',
      'The Circle Undone Investigator Expansion',
      'The Dunwich Legacy Campaign Expansion',
      'The Dunwich Legacy Investigator Expansion',
      'The Forgotten Age Campaign Expansion',
      'The Forgotten Age Investigator Expansion',
      'The Path to Carcosa Campaign Expansion',
      'The Path to Carcosa Investigator Expansion',
    ];

    return [...ahdb, ...emulated];
  }
}

// no need to get many instance of static data.
const thePackRepository = new PackRepository();
