import type { Collection, Pack } from '$app/index';

export function addPack(collection: Collection, pack: Pack): Collection {
  return [...collection, pack];
}
