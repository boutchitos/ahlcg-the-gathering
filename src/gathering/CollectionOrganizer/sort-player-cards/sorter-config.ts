import type { AssetSlot } from './AssetSlot';
import type { PlayerCardtype } from './PlayerCardtype';
import type { PlayerCardsSorter } from './sorting-orders';
import type { PlayerCardClass } from './PlayerCardClass';

export type SortPlayerCardsDirectives = {
  byClasses: PlayerCardClass[];
  assetsBySlots: AssetSlot[];
  byPlayerCardTypes: PlayerCardtype[];
  sortingOrder: PlayerCardsSorter[];
};
