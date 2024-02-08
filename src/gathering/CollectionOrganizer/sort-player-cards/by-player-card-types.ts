import type { Card, ICardsSorter } from './ICardsSorter';

export type PLAYER_CARD_TYPE = 'investigator' | 'asset' | 'event' | 'skill';

export class SortByPlayerCardTypes implements ICardsSorter {
  constructor(
    private playerCardTypes: PLAYER_CARD_TYPE[],
    private assetsSorter: ICardsSorter,
  ) {}

  sortCards(a: Card, b: Card): number {
    const aTypeCode = this.playerCardTypes.indexOf(a.type_code as PLAYER_CARD_TYPE);
    if (aTypeCode === -1) {
      throw new Error(`unknown type code ${a.type_code}`);
    }

    const bTypeCode = this.playerCardTypes.indexOf(b.type_code as PLAYER_CARD_TYPE);
    if (bTypeCode === -1) {
      throw new Error(`unknown type code ${b.type_code}`);
    }

    const result = aTypeCode - bTypeCode;
    if (result !== 0) {
      return result;
    }
    if (a.type_code === 'asset') {
      return this.assetsSorter.sortCards(a, b);
    }
    return 0;
  }
}
