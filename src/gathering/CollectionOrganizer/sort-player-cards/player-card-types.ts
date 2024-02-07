import type { Card, ICardsSorter, PLAYER_CARD_TYPE } from './ICardsSorter';

export class SortByPlayerCardTypes implements ICardsSorter {
  constructor(private playerCardTypes: PLAYER_CARD_TYPE[]) {}

  sortCards(a: Card, b: Card): number {
    const aTypeCode = this.playerCardTypes.indexOf(a.type_code as PLAYER_CARD_TYPE);
    if (aTypeCode === -1) {
      throw new Error(`unknown type code ${a.type_code}`);
    }

    const bTypeCode = this.playerCardTypes.indexOf(b.type_code as PLAYER_CARD_TYPE);
    if (bTypeCode === -1) {
      throw new Error(`unknown type code ${b.type_code}`);
    }

    return aTypeCode - bTypeCode;
  }
}
