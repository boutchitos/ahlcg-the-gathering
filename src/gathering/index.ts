export type Collection = Array<string>;
export type Pack = string;

export interface IPackRepository {
  getAllPacks(): Iterable<Pack>;
}
