export type Card = {
  bonded_cards?: { code: string }[];
  bonded_to?: string;
  code: string;
  faction_code: string;
  faction2_code?: string;
  imagesrc: string;
  name: string;
  pack_code: string;
  pack_name: string;
  quantity: number;
  restrictions?: { investigator: Record<string, string> };
  slot: string;
  subname: string;
  subtype_code?: 'basicweakness' | 'weakness';
  type_code: string;
  url: string;
  xp: number;
};

export type Pocket = {
  cards: Card[];
};
