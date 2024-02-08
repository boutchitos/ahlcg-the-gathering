import type {
  CLASS,
  PLAYER_CARDS_SORTER,
  PLAYER_CARD_TYPE,
  SLOT,
} from './CollectionOrganizer/sort-player-cards/sorter-config';
import type { IBinderOutput } from './IBinderOutput';

export { CLASS, PLAYER_CARD_TYPE, PLAYER_CARDS_SORTER, SLOT };

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderByClasses(classes: CLASS[]): void;
  reorderByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): void;
  reorderBySlots(slots: SLOT[]): void;
  reorderPlayerCardSorters(sorters: PLAYER_CARDS_SORTER[]): void;
}
