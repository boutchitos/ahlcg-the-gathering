import type { Card } from '$gathering/Card';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';

export function classifyPlayerCards(
  cards: Iterable<Card>,
  playerCardClasses: PlayerCardClass[],
): Card[] {
  if (playerCardClasses.length === 0) {
    return [...cards];
  }
  return [...cards].filter((card) => playerCardClasses.includes(card.playerCardClass));
}
