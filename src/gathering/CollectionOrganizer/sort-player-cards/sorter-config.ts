import { DEFAULT_ASSET_SLOTS_ORDER } from "./by-asset-slots";
import { DEFAULT_CLASSES_ORDER } from "./by-classes";
import { DEFAULT_PLAYER_CARDTYPES_ORDER } from "./by-player-card-types";
import { DEFAULT_PLAYER_CARDS_SORTING_ORDER } from "./sorting-orders";

export class SortPlayerCardsDirectives {
  public byClassesOrder = DEFAULT_CLASSES_ORDER;
  public assetsBySlotsOrder = DEFAULT_ASSET_SLOTS_ORDER;
  public byPlayerCardTypesOrder = DEFAULT_PLAYER_CARDTYPES_ORDER;
  public sortingOrder = DEFAULT_PLAYER_CARDS_SORTING_ORDER;

  constructor() {}
}
