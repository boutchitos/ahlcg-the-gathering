import type { AssetSlot } from './AssetSlot';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardsSorter } from './PlayerCardsSorter';
import type { PlayerCardtype } from './PlayerCardtype';

export type SortPlayerCardsDirectives = {
  byClasses: PlayerCardClass[];
  assetsBySlots: AssetSlot[];
  byPlayerCardTypes: PlayerCardtype[];
  sortingOrder: PlayerCardsSorter[];
};
