export type CardInit = {
  bonded_cards?: { code: string }[];
  bonded_to?: string;
  code?: string;
  faction_code?: string;
  name: string;
  quantity: number;
  slot?: string;
  subtype_code?: 'weakness';
  type_code?: string;
  xp?: number;
};

export function card({
  bonded_cards,
  bonded_to,
  code,
  faction_code,
  name,
  quantity,
  slot,
  subtype_code,
  type_code,
  xp,
}: Partial<CardInit> = {}): CardInit {
  return {
    bonded_cards: bonded_cards ?? undefined,
    bonded_to: bonded_to ?? undefined,
    code: code ?? '0001',
    type_code: type_code ?? 'asset',
    faction_code: faction_code ?? 'guardian',
    name: name ?? 'a card',
    quantity: quantity ?? 1,
    slot: slot ?? undefined,
    subtype_code: subtype_code ?? undefined,
    xp: xp ?? 0,
  };
}
