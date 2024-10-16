import type { Card } from '$gathering/Card';
import type { PlayerCardClass } from '$gathering/PlayerCardClass';

type ClassifiedPlayerCards = Record<PlayerCardClass, Card[]>;

export function classifyPlayerCards(cards: Iterable<Card>) {
  const classified: ClassifiedPlayerCards = {
    guardian: [],
    mystic: [],
    rogue: [],
    seeker: [],
    survivor: [],
    multi: [],
    neutral: [],
    'basic weakness': [],
  };

  const cardsByCode = new Map<string, Card>([...cards].map((card) => [card.code, card]));

  for (const card of cards) {
    if (card.restrictions?.investigator !== undefined) {
      const keys = Object.keys(card.restrictions.investigator);
      if (keys.length !== 1) {
        throw Error(
          `find one card with unexpected restrictions ${JSON.stringify(card, undefined, 2)}`,
        );
      }
      const investigatorCode = keys[0];
      const investigator = cardsByCode.get(investigatorCode);
      if (investigator === undefined) {
        throw Error(
          `hypothesis not respected; we thought the restricted cards followed the investigators in their pack.  ${JSON.stringify(card, undefined, 2)}`,
        );
      }
      classified[investigator.playerCardClass].push(card);
    } else {
      classified[card.playerCardClass].push(card);
    }
  }
  return classified;
}
