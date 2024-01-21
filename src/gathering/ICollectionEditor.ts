import type { Pack } from '$gathering/Pack';

export interface ICollectionEditor {
  addPack(pack: Pack): void;
  removePack(pack: Pack): void;
}
