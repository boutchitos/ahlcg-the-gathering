import type { AssetSlot } from './AssetSlot';
import type { ICardsSorter } from './ICardsSorter';
import { SortAssetsBySlots } from './by-asset-slots';
import { SortByClasses } from './by-classes';
import { SortByNames } from './by-names';
import { SortByPlayerCardTypes } from './by-player-cardtypes';
import { SortByLevels } from './by-levels';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';
import type { PlayerCardtype } from '$gathering/PlayerCardtype';

export function sortByClasses(classes: PlayerCardClass[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByNames(): ICardsSorter {
  return new SortByNames();
}

export function sortByPlayerCardTypes(types: PlayerCardtype[], slots: AssetSlot[]): ICardsSorter {
  return new SortByPlayerCardTypes(types, sortAssetsBySlots(slots));
}

export function sortByLevels(): ICardsSorter {
  return new SortByLevels();
}

function sortAssetsBySlots(slots: AssetSlot[]): ICardsSorter {
  return new SortAssetsBySlots(slots);
}
