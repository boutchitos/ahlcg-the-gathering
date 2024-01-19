import type { Collection } from '$gathering/Collection';
import type { Pack } from '$gathering/Pack';

export type AddPackRequest = {
  collection: Collection;
  pack: Pack;
};

export type RemovePackRequest = {
  collection: Collection;
  pack: Pack;
};

export interface ICollectionEditor {
  addPack(request: AddPackRequest): void;
  removePack(request: RemovePackRequest): void;
}
