import type { IBinderOutput } from './IBinderOutput';
import type {
  AssetSlot,
  PlayerCardClass,
  PlayerCardsSorter,
  PlayerCardtype,
} from './CollectionOrganizer/sort-player-cards';
import type { GroupByTitle } from './CollectionOrganizer/group-cards-in-pockets/grouper-config';
export {
  type AssetSlot,
  type PlayerCardClass,
  type PlayerCardtype,
  type PlayerCardsSorter,
} from './CollectionOrganizer/sort-player-cards';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PlayerCardtype[]): void;
  reorderBySlots(slots: AssetSlot[]): void;
  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]): void;

  groupByTitle(groupByTitle: GroupByTitle): void;
  groupBondedCards(groupBondedCards: boolean): void;
}
