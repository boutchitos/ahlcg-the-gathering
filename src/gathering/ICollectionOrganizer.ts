import type { AssetSlot } from './AssetSlot';
import type { GroupByTitle } from './CollectionOrganizer/group-cards-in-pockets/grouper-config';
import type { IBinderOutput } from './IBinderOutput';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardsSorter } from './PlayerCardsSorter';
import type { PlayerCardtype } from './PlayerCardtype';

export type {
  AssetSlot,
  GroupByTitle,
  IBinderOutput,
  PlayerCardClass,
  PlayerCardsSorter,
  PlayerCardtype,
};

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  filterByClass(playerCardClass: PlayerCardClass): void;

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PlayerCardtype[]): void;
  reorderBySlots(slots: AssetSlot[]): void;
  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]): void;

  groupByTitle(groupByTitle: GroupByTitle): void;
  groupBondedCards(groupBondedCards: boolean): void;
  groupInvestigatorCards(groupInvestigatorCards: boolean): void;
}
