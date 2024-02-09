import type { IBinderOutput } from './IBinderOutput';
import type {
  AssetSlot,
  PlayerCardClass,
  PLAYER_CARDS_SORTER,
  PlayerCardtype,
} from './CollectionOrganizer/sort-player-cards';
export {
  fixAssetsBySlots,
  fixByClasses,
  fixByPlayerCardtypes,
  fixPlayerCardsSortingOrder,
  type AssetSlot,
  type PlayerCardClass,
  type PlayerCardtype,
  type PLAYER_CARDS_SORTER,
} from './CollectionOrganizer/sort-player-cards';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PlayerCardtype[]): void;
  reorderBySlots(slots: AssetSlot[]): void;
  reorderPlayerCardSorters(sorters: PLAYER_CARDS_SORTER[]): void;
}
