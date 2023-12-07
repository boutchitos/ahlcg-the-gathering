import ahdbCards from '$lib/server/ahdb.cards.json';
import ahdbPacks from '$lib/server/ahdb.packs.json';
import packList from '$lib/collections/couz.json';
import type { PageServerLoad } from './$types';

type CollectionPack = {
  investigatorExpansionOnly?: boolean;
  nbCopies?: number;
  packCode: string;
};

type Card = {
  faction_code: string;
  name: string;
  pack_code: string;
  slot: string;
  subname: string;
  type_code: string;
  url: string;
  xp: number;
};

type Pack = {
  available: string;
  code: string;
  cycle_position: number;
  id: number;
  known: number;
  name: string;
  position: number;
  total: number;
  url: string;
};

function getCardsByPackCode(ahdbCards: Card[]) {
  const cardsByPackCode = new Map<string, Card[]>();
  for (const card of ahdbCards) {
    if (!cardsByPackCode.has(card.pack_code)) {
      cardsByPackCode.set(card.pack_code, []);
    }
    cardsByPackCode.get(card.pack_code)?.push(card);
  }
  return cardsByPackCode;
}

function getInvestigatorCards(
  cardsByPackCode: Map<string, Card[]>,
  packsCollection: (Pack & CollectionPack)[],
) {
  const cards = new Array<Card[]>();
  for (const pack of packsCollection) {
    const cardsInPack = cardsByPackCode.get(pack.packCode);
    if (cardsInPack === undefined) {
      // Carnevale of Horrors n'a pas de cartes investigator.
      // Je me rends compte que je dois donner 'encounter=1' à l'API pour avoir toutes les cartes.
      // Ceci dit, j'ai cherché dans les cartes qui devraient seulement être investigator, et je
      // trouve des '"faction_code": "mythos"'. C'est étrange et à démêler plus tard.
      if (['coh', 'lol'].includes(pack.packCode)) {
        continue;
      }
      throw new Error(`unknown pack '${pack.packCode}' in collection`);
    }
    cards.push(cardsInPack);
  }
  return cards.flat();
}

function getPacksByCode(ahdbPacks: Pack[]) {
  const packsByCode = new Map<string, Pack>();
  for (const pack of ahdbPacks) {
    if (packsByCode.has(pack.code)) {
      throw new Error('pack already there');
    }
    packsByCode.set(pack.code, pack);
  }
  return packsByCode;
}

const packsByCode: Map<string, Pack> = getPacksByCode(ahdbPacks);
const cardsByPackCode: Map<string, Card[]> = getCardsByPackCode(
  ahdbCards.filter((card) => !['Random Basic Weakness'].includes(card.name)),
);
const packsCollection = packList.map((collPack: CollectionPack) =>
  Object.assign({}, packsByCode.get(collPack.packCode), collPack),
);
const investigatorCardsCollection = getInvestigatorCards(cardsByPackCode, packsCollection);

export const load: PageServerLoad = () => {
  return {
    username: 'Couz',
    packsCollection,
    investigatorCardsCollection,
  };
};
