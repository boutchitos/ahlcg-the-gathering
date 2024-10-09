import type { Card } from '$gathering/Card';

export type { Card };

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}
