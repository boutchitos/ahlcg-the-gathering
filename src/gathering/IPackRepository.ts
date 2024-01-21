import type { Pack } from './Pack';

export interface IPackRepository {
  getAllPacks(): Iterable<Pack>;
}
