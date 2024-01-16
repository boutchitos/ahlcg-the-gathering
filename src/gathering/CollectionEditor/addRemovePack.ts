import type { Collection, Pack } from '$gathering';

export function addPack(collection: Collection, pack: Pack): Collection {
  return [...collection, pack];
}
