import { type AHDBCardProps, Card, type CardProps } from '$gathering/Card';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';

export function card(props: Partial<AHDBCardProps & CardProps>): Card {
  const fullAHDBCards: AHDBCardProps = {
    code: '0001',
    faction_code: 'guardian',
    imagesrc: 'image url',
    name: 'a name',
    pack_name: 'a pack',
    quantity: 1,
    type_code: 'asset',
    xp: 0,
    ...props,
  };
  return new Card({
    location: false,
    playerCardClass: 'guardian',
    playerCardType: 'asset',
    ...fullAHDBCards,
  });
}

type AssetProps = {
  name: string;
  slot: string;
  playerCardClass: PlayerCardClass;
  xp: number;
};

type InvestigatorProps = {
  name: string;
  slot: string;
  playerCardClass: PlayerCardClass;
  xp: number;
};

export class CardBuilder {
  asset(props?: Partial<AssetProps>): Card {
    return card({ ...props, playerCardType: 'asset' });
  }

  event(): Card {
    return card({ playerCardType: 'event' });
  }

  investigator(props?: Partial<InvestigatorProps>): Card {
    return card({ ...props, playerCardType: 'investigator' });
  }

  location(): Card {
    return card({ location: true });
  }

  skill(): Card {
    return card({ playerCardType: 'skill' });
  }
}
