import type { IBinderOutput } from './IBinderOutput';
import type { AssetSlot, PlayerCardsSorter } from './CollectionOrganizer/sort-player-cards';
import type { GroupByTitle } from './CollectionOrganizer/group-cards-in-pockets/grouper-config';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardtype } from './PlayerCardtype';
export { type AssetSlot, type PlayerCardsSorter } from './CollectionOrganizer/sort-player-cards';
export type { PlayerCardClass } from './PlayerCardClass';
export type { PlayerCardtype } from './PlayerCardtype';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PlayerCardtype[]): void;
  reorderBySlots(slots: AssetSlot[]): void;
  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]): void;

  groupByTitle(groupByTitle: GroupByTitle): void;
  groupBondedCards(groupBondedCards: boolean): void;
  groupInvestigatorCards(groupInvestigatorCards: boolean): void;
}
