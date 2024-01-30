import type { Card } from '$gathering/IBinderOutput';
import type { ICardRepository } from '$gathering/ICardRepository';
import ahdbCards from './ahdb.cards.json';

export function createCardRepository(): ICardRepository {
  return theCardRepository;
}

class CardRepository implements ICardRepository {
  getInvestigatorCards(packs: string[]): Iterable<Card> {
    const allCards = cleanAHDBCards();
    const cardsByPackName: Map<string, Card[]> = getCardsByPackName(allCards);
    return getInvestigatorCards(cardsByPackName, packs);
  }
}

// no need to get many instance of static data.
const theCardRepository = new CardRepository();

function getCardsByPackName(ahdbCards: Card[]) {
  const cardsByPackName = new Map<string, Card[]>();
  for (const card of ahdbCards) {
    if (!cardsByPackName.has(card.pack_name)) {
      cardsByPackName.set(card.pack_name, []);
    }
    cardsByPackName.get(card.pack_name)?.push(card);
  }
  return cardsByPackName;
}

function getInvestigatorCards(cardsByPackName: Map<string, Card[]>, packs: string[]) {
  const cards = new Array<Card[]>();
  for (const packName of packs) {
    const cardsInPack = cardsByPackName.get(packName);
    if (cardsInPack === undefined) {
      // // Carnevale of Horrors n'a pas de cartes investigator.
      // // Je me rends compte que je dois donner 'encounter=1' à l'API pour avoir toutes les cartes.
      // // Ceci dit, j'ai cherché dans les cartes qui devraient seulement être investigator, et je
      // // trouve des '"faction_code": "mythos"'. C'est étrange et à démêler plus tard.
      // // Je viens d'en trouver la cause. Ça vient du pack guardians et ce sont des story qui tant
      // // qu'à moi, ne vont pas dans les player cards. Le throw ici est mal inséré. Car le pack
      // // existe, mais n'a pas de carte.
      // if (['coh', 'lol', 'guardians'].includes(packName)) {
      //   continue;
      // }
      throw new Error(`unknown pack '${packName}'`);
    }
    cards.push(cardsInPack);
  }
  return cards.flat();
}

function cleanAHDBCards() {
  const multiClassTitles = ahdbCards.filter((card) => card.faction2_code).map((card) => card.name);
  const allCards = ahdbCards
    .filter((card) => !['Random Basic Weakness'].includes(card.name))
    .filter((card) => !multiClassTitles.includes(card.name))
    .filter((card) => !card.code.match(/[0-9]+b/));
  return allCards;
}
