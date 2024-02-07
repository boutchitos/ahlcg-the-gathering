import type { Card } from '$gathering/IBinderOutput';

export { Card };

export interface ICardsSorter {
  sortCards(a: Card, b: Card): number;
}
