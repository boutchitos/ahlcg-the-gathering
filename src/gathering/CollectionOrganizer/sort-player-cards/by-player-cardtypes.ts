import type { PlayerCardtype } from '$gathering/PlayerCardtype';
import type { Card, ICardsSorter } from './ICardsSorter';

export class SortByPlayerCardTypes implements ICardsSorter {
  constructor(
    private playerCardTypes: PlayerCardtype[],
    private assetsSorter: ICardsSorter,
  ) {}

  sortCards(a: Card, b: Card): number {
    if (a.playerCardType === undefined || b.playerCardType === undefined) {
      // kind of a basic weakness, we can't tell which one goes firts.
      return 0;
    }

    const aTypeCode = this.playerCardTypes.indexOf(a.playerCardType);
    const bTypeCode = this.playerCardTypes.indexOf(b.playerCardType);
    const result = aTypeCode - bTypeCode;
    if (result !== 0) {
      return result;
    }
    if (a.asset) {
      return this.assetsSorter.sortCards(a, b);
    }
    return 0;
  }
}
