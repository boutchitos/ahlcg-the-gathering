import type { AssetSlot } from './AssetSlot';
import type { ICardsSorter } from './ICardsSorter';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardtype } from './PlayerCardtype';
import { SortAssetsBySlots } from './by-asset-slots';
import { SortByClasses } from './by-classes';
import { SortByNames } from './by-names';
import { SortByPlayerCardTypes } from './by-player-cardtypes';

export function sortByClasses(classes: PlayerCardClass[]): ICardsSorter {
  return new SortByClasses(classes);
}

export function sortByNames(): ICardsSorter {
  return new SortByNames();
}

export function sortByPlayerCardTypes(types: PlayerCardtype[], slots: AssetSlot[]): ICardsSorter {
  return new SortByPlayerCardTypes(types, sortAssetsBySlots(slots));
}

function sortAssetsBySlots(slots: AssetSlot[]): ICardsSorter {
  return new SortAssetsBySlots(slots);
}
