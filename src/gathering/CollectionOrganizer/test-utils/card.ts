import { type AHDBCardProps, Card, type CardProps } from '$gathering/Card';

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
  return new Card({ playerCardClass: 'guardian', ...fullAHDBCards });
}
