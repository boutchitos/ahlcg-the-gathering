import type { PLAYER_CARD_TYPE } from './by-player-card-types';
import type { PLAYER_CARDS_SORTER } from './sorting-orders';
import type { SLOT } from './by-asset-slots';
import type { PlayerCardClass } from './PlayerCardClass';

export type SortPlayerCardsDirectives = {
  byClasses: PlayerCardClass[];
  assetsBySlots: SLOT[];
  byPlayerCardTypes: PLAYER_CARD_TYPE[];
  sortingOrder: PLAYER_CARDS_SORTER[];
};
