type BondedCards = { code: string }[];
export type AHDBCardProps = {
  bonded_cards?: BondedCards;
  bonded_to?: string;
  code: string;
  faction_code: string;
  faction2_code?: string;
  imagesrc: string;
  name: string;
  pack_name: string;
  quantity: number;
  restrictions?: { investigator: Record<string, string> };
  slot?: string;
  subtype_code?: 'basicweakness' | 'weakness';
  type_code: string;
  xp: number;
};

export class Card {
  bonded_cards?: BondedCards;
  bonded_to?: string;
  code: string;
  faction_code: string;
  faction2_code?: string;
  imagesrc: string;
  name: string;
  pack_name: string;
  quantity: number;
  restrictions?: { investigator: Record<string, string> };
  slot?: string;
  subtype_code?: 'basicweakness' | 'weakness';
  type_code: string;
  xp: number;

  constructor(props: AHDBCardProps) {
    this.bonded_cards = props.bonded_cards;
    this.bonded_to = props.bonded_to;
    this.code = props.code;
    this.faction_code = props.faction_code;
    this.faction2_code = props.faction2_code;
    this.imagesrc = props.imagesrc;
    this.name = props.name;
    this.pack_name = props.pack_name;
    this.quantity = props.quantity;
    this.restrictions = props.restrictions;
    this.slot = props.slot;
    this.subtype_code = props.subtype_code;
    this.type_code = props.type_code;
    this.xp = props.xp;
  }
}
