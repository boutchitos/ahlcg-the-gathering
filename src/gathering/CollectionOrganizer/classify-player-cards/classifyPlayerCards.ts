import type { Card } from '$gathering/Card';
import { type PlayerCardClass } from '$gathering/PlayerCardClass';

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
      const investigatorClass = getRestrictedToInvestigatorClass(card, cardsByCode);
      classified[investigatorClass].push(card);
    } else if (card.name === 'Aetheric Current') {
      // bonded to a restricted card (Flux Stabilizer) for Kate Winthrop
      // we could chain that
      classified.seeker.push(card);
    } else {
      classified[card.playerCardClass].push(card);
    }
  }
  return classified;
}

// On fouille juste dans les cartes de la collection. On en veut un. Si plusieurs, c'est le même.
function getRestrictedToInvestigatorClass(
  card: Card,
  cardsByCode: Map<string, Card>,
): PlayerCardClass {
  const restrictedToInvestigatorClasses = new Set<PlayerCardClass>();

  const keys = Object.keys(card.restrictions!.investigator);
  for (const k of keys) {
    // verif...
    if (card.restrictions?.investigator[k] !== k) {
      // actually investigator[k] === k
      throw Error(`bad assomption ${JSON.stringify(card, undefined, 2)}`);
    }
    const investigator = cardsByCode.get(k);
    if (investigator !== undefined) {
      restrictedToInvestigatorClasses.add(investigator.playerCardClass);
    }
  }
  if (restrictedToInvestigatorClasses.size !== 1) {
    throw Error(
      `After further analysis, this card sucks to find it's class ${JSON.stringify(card, undefined, 2)}`,
    );
  }
  return [...restrictedToInvestigatorClasses][0];
}
