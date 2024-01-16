export type Collection = Array<string>;
export type Pack = string;

export function addPack(collection: Collection, pack: Pack): Collection {
  return [...collection, pack];
}
