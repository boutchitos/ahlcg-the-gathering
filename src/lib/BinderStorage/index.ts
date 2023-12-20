export type Card = {
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
  type_code: string;
  url: string;
  xp: number;
};

export type Pocket = {
  cards: Card[];
};
