import type { Card } from './Card';
import type { Pack } from './Pack';

export type { Card, Pack };

export interface ICardRepository {
  getInvestigatorCards(packs: Pack[]): Iterable<Card>;
}
