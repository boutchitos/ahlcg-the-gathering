import type { Card, ICardsSorter } from './ICardsSorter';
import type { PlayerCardtype } from './PlayerCardtype';

export class SortByPlayerCardTypes implements ICardsSorter {
  constructor(
    private playerCardTypes: PlayerCardtype[],
    private assetsSorter: ICardsSorter,
  ) {}

  sortCards(a: Card, b: Card): number {
    const aTypeCode = this.playerCardTypes.indexOf(a.type_code as PlayerCardtype);
    if (aTypeCode === -1) {
      throw new Error(`unknown type code ${a.type_code}`);
    }

    const bTypeCode = this.playerCardTypes.indexOf(b.type_code as PlayerCardtype);
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
