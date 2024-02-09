import type { AssetSlot } from './AssetSlot';
import type { PlayerCardtype } from './PlayerCardtype';
import type { PLAYER_CARDS_SORTER } from './sorting-orders';
import type { PlayerCardClass } from './PlayerCardClass';

export type SortPlayerCardsDirectives = {
  byClasses: PlayerCardClass[];
  assetsBySlots: AssetSlot[];
  byPlayerCardTypes: PlayerCardtype[];
  sortingOrder: PLAYER_CARDS_SORTER[];
};
