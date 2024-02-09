import type { IBinderOutput } from './IBinderOutput';
import type {
  PlayerCardClass,
  PLAYER_CARDS_SORTER,
  PLAYER_CARD_TYPE,
  SLOT,
} from './CollectionOrganizer/sort-player-cards';
export {
  fixAssetsBySlots,
  fixByClasses,
  fixByPlayerCardtypes,
  fixPlayerCardsSortingOrder,
  type PlayerCardClass,
  type PLAYER_CARDS_SORTER,
  type PLAYER_CARD_TYPE,
  type SLOT,
} from './CollectionOrganizer/sort-player-cards';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): void;
  reorderBySlots(slots: SLOT[]): void;
  reorderPlayerCardSorters(sorters: PLAYER_CARDS_SORTER[]): void;
}
