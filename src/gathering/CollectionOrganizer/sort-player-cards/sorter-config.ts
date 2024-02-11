import { AssetSlots, type AssetSlot } from './AssetSlot';
import { PlayerCardClasses, type PlayerCardClass } from './PlayerCardClass';
import { PlayerCardsSorters, type PlayerCardsSorter } from './PlayerCardsSorter';
import { PlayerCardtypes, type PlayerCardtype } from './PlayerCardtype';

export const DEFAULT_ASSET_SLOTS_ORDER = Object.keys(AssetSlots).filter((v) =>
  isNaN(Number(v)),
) as AssetSlot[];

export const DEFAULT_CLASSES_ORDER = Object.keys(PlayerCardClasses).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardClass[];

export const DEFAULT_PLAYER_CARDTYPES_ORDER = Object.keys(PlayerCardtypes).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardtype[];

export const DEFAULT_PLAYER_CARDS_SORTING_ORDER = Object.keys(PlayerCardsSorters).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardsSorter[];

export class SortPlayerCardsDirectives {
  private _assetsBySlotsOrder = DEFAULT_ASSET_SLOTS_ORDER;
  private _byClassesOrder = DEFAULT_CLASSES_ORDER;
  private _byPlayerCardTypesOrder = DEFAULT_PLAYER_CARDTYPES_ORDER;
  private _sortingOrder = DEFAULT_PLAYER_CARDS_SORTING_ORDER;

  get assetsBySlotsOrder(): AssetSlot[] {
    return [...this._assetsBySlotsOrder];
  }

  set assetsBySlotsOrder(value: string[]) {
    this._assetsBySlotsOrder = fixAssetsBySlotsOrder(value);
  }

  get byClassesOrder(): PlayerCardClass[] {
    return [...this._byClassesOrder];
  }

  set byClassesOrder(value: string[]) {
    this._byClassesOrder = fixByClassesOrder(value);
  }

  get byPlayerCardTypesOrder(): PlayerCardtype[] {
    return [...this._byPlayerCardTypesOrder];
  }

  set byPlayerCardTypesOrder(value: string[]) {
    this._byPlayerCardTypesOrder = fixByPlayerCardtypesOrder(value);
  }

  get sortingOrder(): PlayerCardsSorter[] {
    return [...this._sortingOrder];
  }

  set sortingOrder(value: string[]) {
    this._sortingOrder = fixPlayerCardsSortingOrder(value);
  }
}

function fixAssetsBySlotsOrder(wannaBe: string[]): AssetSlot[] {
  const incoming = new Set(
    wannaBe.filter((slot) => DEFAULT_ASSET_SLOTS_ORDER.includes(slot as AssetSlot)),
  );
  if (incoming.size !== DEFAULT_ASSET_SLOTS_ORDER.length) {
    return DEFAULT_ASSET_SLOTS_ORDER;
  }
  return wannaBe as AssetSlot[];
}

function fixByClassesOrder(wannaBe: string[]): PlayerCardClass[] {
  const incoming = new Set(
    wannaBe.filter((aClass) => DEFAULT_CLASSES_ORDER.includes(aClass as PlayerCardClass)),
  );
  if (incoming.size !== DEFAULT_CLASSES_ORDER.length) {
    return DEFAULT_CLASSES_ORDER;
  }
  return wannaBe as PlayerCardClass[];
}

function fixByPlayerCardtypesOrder(wannaBe: string[]): PlayerCardtype[] {
  const incoming = new Set(
    wannaBe.filter((playerCardtype) =>
      DEFAULT_PLAYER_CARDTYPES_ORDER.includes(playerCardtype as PlayerCardtype),
    ),
  );
  if (incoming.size !== DEFAULT_PLAYER_CARDTYPES_ORDER.length) {
    return DEFAULT_PLAYER_CARDTYPES_ORDER;
  }
  return wannaBe as PlayerCardtype[];
}

function fixPlayerCardsSortingOrder(wannaBe: string[]): PlayerCardsSorter[] {
  const incoming = new Set(
    wannaBe.filter((sorter) =>
      DEFAULT_PLAYER_CARDS_SORTING_ORDER.includes(sorter as PlayerCardsSorter),
    ),
  );
  if (incoming.size !== DEFAULT_PLAYER_CARDS_SORTING_ORDER.length) {
    return DEFAULT_PLAYER_CARDS_SORTING_ORDER;
  }
  return wannaBe as PlayerCardsSorter[];
}
