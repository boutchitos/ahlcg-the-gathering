import type { Card } from '$gathering/Card';
import { type PlayerCardClass } from '$gathering/PlayerCardClass';

export type ClassifiedPlayerCards = Record<PlayerCardClass, Card[]>;

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

  const cardsClassifier = new PlayerCardClassifier(cards);
  for (const card of cards) {
    const playerCardClass = cardsClassifier.classify(card);
    classified[playerCardClass].push(card);
  }

  return classified;
}

class PlayerCardClassifier {
  private readonly cardsByCode: Map<string, Card>;
  private readonly cardsByName: Map<string, Card>;

  constructor(cards: Iterable<Card>) {
    // Node 22.0 for map on Iterable.
    this.cardsByCode = new Map([...cards].map((card) => [card.code, card]));
    this.cardsByName = new Map([...cards].map((card) => [card.name, card]));
  }

  public classify(card: Card): PlayerCardClass {
    return (
      this.ifCardHasRestrictionsGetInvestigatorClass(card) ||
      this.ifCardIsBondedGetBondedToCardClass(card) ||
      card.playerCardClass
    );
  }

  private ifCardIsBondedGetBondedToCardClass(card: Card): PlayerCardClass | null {
    if (card.bonded_to === undefined) {
      return null;
    }

    const bondedToCard = this.cardsByName.get(card.bonded_to);
    if (bondedToCard === undefined) {
      throw Error(`bonded to card not found for bonded card ${JSON.stringify(card, undefined, 2)}`);
    }

    return (
      this.ifCardHasRestrictionsGetInvestigatorClass(bondedToCard) || bondedToCard.playerCardClass
    );
  }

  private ifCardHasRestrictionsGetInvestigatorClass(card: Card): PlayerCardClass | null {
    if (card.restrictions === undefined) {
      return null;
    }

    const restrictedToInvestigatorClasses = new Set<PlayerCardClass>();

    for (const [kCode, vCode] of Object.entries(card.restrictions.investigator)) {
      if (kCode !== vCode) {
        throw Error(
          `Bad assomption: keys and values are always the same for investigator Record ${JSON.stringify(card, undefined, 2)}`,
        );
      }

      const investigator = this.cardsByCode.get(kCode);
      if (investigator === undefined) {
        // Actually, we are running this analysis only on the collection packs. This should be good. But the card contains
        // restriction for all known cards so far. Anyway, the goal is to have only one class, we don't need all.
        continue;
      }

      restrictedToInvestigatorClasses.add(investigator.playerCardClass);
    }

    if (restrictedToInvestigatorClasses.size !== 1) {
      // Normally, when there are more than one investigator code, they are the same investigator (promo cards).
      // So, for now, we assume it's always the same class.
      throw Error(
        `After further analysis, this card sucks to find its class ${JSON.stringify(card, undefined, 2)}`,
      );
    }

    return [...restrictedToInvestigatorClasses][0];
  }
}
