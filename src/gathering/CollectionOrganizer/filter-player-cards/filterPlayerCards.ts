import type { Card } from '$gathering/Card';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';

export function filterPlayerCards(
  cards: Iterable<Card>,
  playerCardClass?: PlayerCardClass,
): Card[] {
  if (playerCardClass === undefined) {
    return [...cards];
  }
  return [...cards].filter((card) => card.playerCardClass === playerCardClass);
}
