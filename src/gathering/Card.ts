import { availablePlayerCardClass, type PlayerCardClass } from './PlayerCardClass';

type BondedCards = { code: string }[];
export type CardProps = {
  playerCardClass: PlayerCardClass;
};
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
  public readonly playerCardClass: PlayerCardClass;
  public readonly asset: boolean;
  public readonly investigator: boolean;

  bonded_cards?: BondedCards;
  bonded_to?: string;
  code: string;
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

  constructor(props: AHDBCardProps & CardProps) {
    this.bonded_cards = props.bonded_cards;
    this.bonded_to = props.bonded_to;
    this.code = props.code;
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

    this.asset = props.type_code === 'asset';
    this.investigator = props.type_code === 'investigator';
    this.playerCardClass = getClassOfPlayerCard(props);
  }
}

function getClassOfPlayerCard(props: AHDBCardProps & CardProps): PlayerCardClass {
  if (isFactionCode(props.playerCardClass)) {
    return props.playerCardClass;
  }

  if (isWeaknessCard(props)) return 'basic weakness';

  if (props.faction2_code !== undefined) return 'multi';

  if (isFactionCode(props.faction_code)) {
    return props.faction_code;
  }

  throw new Error(`Bad classification for this card: ${JSON.stringify(props, undefined, 2)}`);
}

function isFactionCode(wannaBe: string): wannaBe is PlayerCardClass {
  return availablePlayerCardClass.includes(wannaBe as PlayerCardClass);
}

function isWeaknessCard(props: AHDBCardProps) {
  const enemy = props.type_code === 'enemy';
  const weakness = props.subtype_code?.includes('weakness');
  return enemy || weakness;
}
