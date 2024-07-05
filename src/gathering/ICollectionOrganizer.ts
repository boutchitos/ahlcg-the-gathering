import type { AssetSlot } from './AssetSlot';
import type { IBinderOutput } from './IBinderOutput';
import type { GroupByTitle } from './CollectionOrganizer/group-cards-in-pockets/grouper-config';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardtype } from './PlayerCardtype';
import type { PlayerCardsSorter } from './PlayerCardsSorter';

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

  reorderByClasses(classes: PlayerCardClass[]): void;
  reorderByPlayerCardTypes(types: PlayerCardtype[]): void;
  reorderBySlots(slots: AssetSlot[]): void;
  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]): void;

  groupByTitle(groupByTitle: GroupByTitle): void;
  groupBondedCards(groupBondedCards: boolean): void;
  groupInvestigatorCards(groupInvestigatorCards: boolean): void;
}
