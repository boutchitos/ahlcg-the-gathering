import type { ICardRepository } from '$gathering/ICardRepository';
import type { Pack } from '$gathering/Pack';
import { Card } from '$gathering/Card';
import ahdbCards from './ahdb.cards.json';

export function createCardRepository(): ICardRepository {
  return theCardRepository;
}

class CardRepository implements ICardRepository {
  getInvestigatorCards(packs: Pack[]): Iterable<Card> {
    const emulatedPacks = emulatePacks(packs);
    return getInvestigatorCards(cardsByPackName, emulatedPacks);
  }
}

// no need to get many instance of static data.
const theCardRepository = new CardRepository();

const allCards = cleanAHDBCards().map((props) => new Card(props));
const cardsByPackName: Map<string, Card[]> = getCardsByPackName(allCards);

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

function getInvestigatorCards(cardsByPackName: Map<string, Card[]>, packs: string[]): Card[] {
  const cards = new Array<Card>();
  for (const packName of packs) {
    const cardsInPack = cardsByPackName.get(packName);
    if (cardsInPack === undefined) {
      // may be present those as useless in binders for no investigator cards...
      if (
        [
          'Carnevale of Horrors',
          'Curse of the Rougarou',
          'Fortune and Folly',
          'Guardians of the Abyss',
          'Machinations Through Time',
          'Murder at the Excelsior Hotel',
          'The Blob That Ate Everything',
          'The Labyrinths of Lunacy',
          'War of the Outer Gods',
        ].includes(packName) ||
        !!packName.match(/ Campaign Expansion$/)
      ) {
        continue;
      }
      throw new Error(`unknown pack '${packName}'`);
    }
    cardsInPack.forEach((card) => {
      for (let i = 0; i < card.quantity; ++i) {
        cards.push(card);
      }
    });
  }
  return cards;
}

function cleanAHDBCards() {
  const allCards = ahdbCards
    .filter((card) => !['Random Basic Weakness'].includes(card.name))
    .filter((card) => !card.code.match(/[0-9]+b/));
  return allCards;
}

function emulatePacks(packs: Pack[]): Pack[] {
  return packs
    .map((pack) => {
      switch (pack) {
        case 'The Circle Undone Campaign Expansion':
        case 'The Circle Undone Investigator Expansion':
          return [
            'The Circle Undone',
            'The Secret Name',
            'The Wages of Sin',
            'For the Greater Good',
            'Union and Disillusion',
            'In the Clutches of Chaos',
            'Before the Black Throne',
          ];

        case 'The Dunwich Legacy Campaign Expansion':
        case 'The Dunwich Legacy Investigator Expansion':
          return [
            'The Dunwich Legacy',
            'The Miskatonic Museum',
            'The Essex County Express',
            'Blood on the Altar',
            'Undimensioned and Unseen',
            'Where Doom Awaits',
            'Lost in Time and Space',
          ];

        case 'The Forgotten Age Campaign Expansion':
        case 'The Forgotten Age Investigator Expansion':
          return [
            'The Forgotten Age',
            'Threads of Fate',
            'The Boundary Beyond',
            'Heart of the Elders',
            'The City of Archives',
            'The Depths of Yoth',
            'Shattered Aeons',
          ];

        case 'The Path to Carcosa Campaign Expansion':
        case 'The Path to Carcosa Investigator Expansion':
          return [
            'The Path to Carcosa',
            'Echoes of the Past',
            'The Unspeakable Oath',
            'A Phantom of Truth',
            'The Pallid Mask',
            'Black Stars Rise',
            'Dim Carcosa',
          ];

        default:
          return [pack];
      }
    })
    .flat();
}
