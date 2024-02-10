import type { Card } from '$gathering/ICardRepository';

export { Card };

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}
