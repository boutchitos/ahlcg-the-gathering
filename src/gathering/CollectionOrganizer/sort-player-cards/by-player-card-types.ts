import type { Card, ICardsSorter } from './ICardsSorter';

export enum PlayerCardtypes {
  investigator,
  asset,
  event,
  skill,
}

export type PLAYER_CARD_TYPE = keyof typeof PlayerCardtypes;
export const DEFAULT_PLAYER_CARDTYPES_ORDER = Object.keys(PlayerCardtypes).filter((v) =>
  isNaN(Number(v)),
) as PLAYER_CARD_TYPE[];

export function fixByPlayerCardtypes(wannaBe: string[]): PLAYER_CARD_TYPE[] {
  const incoming = new Set(
    wannaBe.filter((playerCardtype) => DEFAULT_PLAYER_CARDTYPES_ORDER.includes(playerCardtype as PLAYER_CARD_TYPE)),
  );
  if (incoming.size !== DEFAULT_PLAYER_CARDTYPES_ORDER.length) {
    return DEFAULT_PLAYER_CARDTYPES_ORDER;
  }
  return wannaBe as PLAYER_CARD_TYPE[];
}

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
