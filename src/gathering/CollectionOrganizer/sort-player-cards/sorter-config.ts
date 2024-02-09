import type { CLASS } from './by-classes';
import type { PLAYER_CARD_TYPE } from './by-player-card-types';
import type { SLOT } from './by-asset-slots';

export type PLAYER_CARDS_SORTER = 'by-classes' | 'by-player-card-types';

export type SortPlayerCardsDirectives = {
  byClasses: CLASS[];
  assetsBySlots: SLOT[];
  byPlayerCardTypes: PLAYER_CARD_TYPE[];
  sortingOrder: PLAYER_CARDS_SORTER[];
};
