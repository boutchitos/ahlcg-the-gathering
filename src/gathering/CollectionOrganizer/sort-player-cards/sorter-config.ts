import type { AssetSlot } from './AssetSlot';
import type { PlayerCardClass } from './PlayerCardClass';
import type { PlayerCardsSorter } from './PlayerCardsSorter';
import type { PlayerCardtype } from './PlayerCardtype';
import { DEFAULT_ASSET_SLOTS_ORDER, fixAssetsBySlotsOrder } from './by-asset-slots';
import { DEFAULT_CLASSES_ORDER, fixByClassesOrder } from './by-classes';
import { DEFAULT_PLAYER_CARDTYPES_ORDER, fixByPlayerCardtypesOrder } from './by-player-card-types';
import { DEFAULT_PLAYER_CARDS_SORTING_ORDER, fixPlayerCardsSortingOrder } from './sorting-orders';

export class SortPlayerCardsDirectives {
  private _assetsBySlotsOrder = DEFAULT_ASSET_SLOTS_ORDER;
  private _byClassesOrder = DEFAULT_CLASSES_ORDER;
  private _byPlayerCardTypesOrder = DEFAULT_PLAYER_CARDTYPES_ORDER;
  private _sortingOrder = DEFAULT_PLAYER_CARDS_SORTING_ORDER;

  get assetsBySlotsOrder(): AssetSlot[] {
    return this._assetsBySlotsOrder;
  }

  set assetsBySlotsOrder(value: string[]) {
    this._assetsBySlotsOrder = fixAssetsBySlotsOrder(value);
  }

  get byClassesOrder(): PlayerCardClass[] {
    return this._byClassesOrder;
  }

  set byClassesOrder(value: string[]) {
    this._byClassesOrder = fixByClassesOrder(value);
  }

  get byPlayerCardTypesOrder(): PlayerCardtype[] {
    return this._byPlayerCardTypesOrder;
  }

  set byPlayerCardTypesOrder(value: string[]) {
    this._byPlayerCardTypesOrder = fixByPlayerCardtypesOrder(value);
  }

  get sortingOrder(): PlayerCardsSorter[] {
    return this._sortingOrder;
  }

  set sortingOrder(value: string[]) {
    this._sortingOrder = fixPlayerCardsSortingOrder(value);
  }
}
