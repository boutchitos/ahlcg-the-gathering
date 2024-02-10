import type { Card } from '$gathering/Card';

export { Card };

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}
