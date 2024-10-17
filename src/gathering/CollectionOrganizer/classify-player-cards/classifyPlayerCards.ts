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

  const cardsClassifier = new CardClassifier(cards);

  for (const card of cards) {
    if (card.restrictions?.investigator !== undefined) {
      const investigatorClass = cardsClassifier.getRestrictedToInvestigatorClass(card);
      classified[investigatorClass].push(card);
    } else if (card.name === 'Aetheric Current') {
      // bonded to a restricted card (Flux Stabilizer) for Kate Winthrop
      // we could chain that
      classified.seeker.push(card);
    } else if (card.name === 'Dream-Gate') {
      // bonded to a restricted card (Flux Stabilizer) for Kate Winthrop
      // we could chain that
      classified.mystic.push(card);
    } else if (card.bonded_to !== undefined) {
      const bondedToCardClass = cardsClassifier.getBondedToCardClass(card);
      classified[bondedToCardClass].push(card);
    } else {
      classified[card.playerCardClass].push(card);
    }
  }
  return classified;
}

class CardClassifier {
  private readonly cardsByCode: Map<string, Card>;
  private readonly cardsByName: Map<string, Card>;

  constructor(cards: Iterable<Card>) {
    this.cardsByCode = new Map([...cards].map((card) => [card.code, card]));
    this.cardsByName = new Map([...cards].map((card) => [card.name, card]));
  }

  public getBondedToCardClass(card: Card): PlayerCardClass {
    if (card.bonded_to === undefined) {
      throw Error(`shoul have bonded card to call... will refact soon`);
    }
    const bondedToCard = this.cardsByName.get(card.bonded_to);
    if (bondedToCard === undefined) {
      throw Error(`bonded to card not found for bonded card ${JSON.stringify(card, undefined, 2)}`);
    }
    return bondedToCard.playerCardClass;
  }

  public getRestrictedToInvestigatorClass(card: Card): PlayerCardClass {
    const restrictedToInvestigatorClasses = new Set<PlayerCardClass>();

    for (const [kCode, vCode] of Object.entries(card.restrictions!.investigator)) {
      if (kCode !== vCode) {
        throw Error(
          `Bad assomption: keys and values are always the same ${JSON.stringify(card, undefined, 2)}`,
        );
      }

      const investigator = this.cardsByCode.get(kCode);
      if (investigator !== undefined) {
        restrictedToInvestigatorClasses.add(investigator.playerCardClass);
      }
    }

    if (restrictedToInvestigatorClasses.size !== 1) {
      throw Error(
        `After further analysis, this card sucks to find its class ${JSON.stringify(card, undefined, 2)}`,
      );
    }

    return [...restrictedToInvestigatorClasses][0];
  }
}
