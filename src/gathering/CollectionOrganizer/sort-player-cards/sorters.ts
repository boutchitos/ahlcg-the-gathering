import type { AssetSlot } from './AssetSlot';
import type { ICardsSorter } from './ICardsSorter';
import type { PlayerCardClass } from './PlayerCardClass';
import { SortAssetsBySlots } from './by-asset-slots';
import { SortByClasses } from './by-classes';
import { SortByPlayerCardTypes, type PLAYER_CARD_TYPE } from './by-player-card-types';

export function sortByClasses(classes: PlayerCardClass[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByPlayerCardTypes(types: PLAYER_CARD_TYPE[], slots: AssetSlot[]): ICardsSorter {
  return new SortByPlayerCardTypes(types, sortAssetsBySlots(slots));
}

function sortAssetsBySlots(slots: AssetSlot[]): ICardsSorter {
  return new SortAssetsBySlots(slots);
}
