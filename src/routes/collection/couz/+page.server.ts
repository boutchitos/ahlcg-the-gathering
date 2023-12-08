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
  displayName: string;
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

const getCardDisplayName = (card: Card) => {
  const subname = card.subname ? `: ${card.subname}` : '';
  const xp = card.xp ? ` (${card.xp} xp)` : '';
  const slot = card.type_code === 'asset' && card.slot ? `-- ${card.slot}` : '';
  return `${card.faction_code} -- ${card.type_code}${slot}  -- ${card.name}${subname}${xp}`;
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

const sortCardsAsUserWant = (a: Card, b: Card) => {
  const faction_sort = a.faction_code.localeCompare(b.faction_code);
  if (faction_sort !== 0) return faction_sort;

  const typeCodeOrder = ['investigator', 'asset', 'event', 'skill', 'story', 'enemy', 'treachery']; // story, enemy???
  const aTypeCode = typeCodeOrder.indexOf(a.type_code);
  const bTypeCode = typeCodeOrder.indexOf(b.type_code);
  if (aTypeCode === -1) {
    throw new Error(`unknown type code ${a.type_code}`);
  }
  if (bTypeCode === -1) {
    throw new Error(`unknown type code ${b.type_code}`);
  }
  const type_code_sort = aTypeCode - bTypeCode;
  if (type_code_sort !== 0) return type_code_sort;

  const slot_sort = (a.slot ?? '').localeCompare(b.slot ?? '');
  if (slot_sort !== 0) return slot_sort;

  const name_sort = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
  if (name_sort !== 0) return name_sort;

  const xp_sort = a.xp - b.xp;
  if (xp_sort !== 0) return xp_sort;

  return 0;
};

const packsByCode: Map<string, Pack> = getPacksByCode(ahdbPacks);
const cardsByPackCode: Map<string, Card[]> = getCardsByPackCode(
  ahdbCards
    .filter((card) => !['Random Basic Weakness'].includes(card.name))
    .map((card) => {
      card.displayName = getCardDisplayName(card);
      return card;
    }),
);
const packsCollection = packList.map((collPack: CollectionPack) =>
  Object.assign({}, packsByCode.get(collPack.packCode), collPack),
);
const investigatorCardsCollection = getInvestigatorCards(cardsByPackCode, packsCollection).sort(
  sortCardsAsUserWant,
);

export const load: PageServerLoad = () => {
  return {
    username: 'Couz',
    packsCollection,
    investigatorCardsCollection,
  };
};
