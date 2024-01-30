import type { Card } from '$gathering/IBinderOutput';
import type { Pack } from './Pack';

export interface ICardRepository {
  getInvestigatorCards(packs: Pack[]): Iterable<Card>;
}
