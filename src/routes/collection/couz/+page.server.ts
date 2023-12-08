import ahdbCards from '$lib/server/ahdb.cards.json';
import ahdbPacks from '$lib/server/ahdb.packs.json';
import packList from '$lib/collections/couz.json';
import type { PageServerLoad } from './$types';

// Un pack loader, avec émulation pour Path to Carcosa qui n'est pas sur ArkhamDB.
// Je vais me l'inventer de mon bord, le Investigator Expansion. Ce sera aussi plus domaine pour le user.
// Serait plus simple de simuler la "physique". Donc, j'ai 2 Core dans ma collection.
// Le traitement devrait fonctionner. Même chose avec les cartes. J'aurais 2 Knifes par Core.
// Je mettrais 2 cartes dans la liste. Et 4 au total avec le traitement (2 packs qui ajoutent 2 cartes chaque)

type CollectionPack = {
  nbCopies: number;
  packCode: string; // id?
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
  packsCollection: Array<CollectionPack>,
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

const sortPlayerCardsByType = (a: Card, b: Card): number => {
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

  return 0;
};

// Je pourrais procéder par exception pour sortir de l'algo. dès que je sais le tri.
const sortCardsAsUserWant = (a: Card, b: Card) => {
  const faction_sort = a.faction_code.localeCompare(b.faction_code);
  if (faction_sort !== 0) return faction_sort;

  const byType = sortPlayerCardsByType(a, b);
  if (byType !== 0) return byType;

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

const packsCollection: Array<Pack & CollectionPack> = packList.map(
  (collPack: Record<string, unknown>) => {
    if (collPack.packCode === undefined || typeof collPack.packCode !== 'string') {
      throw new Error(`packCode missing or is not a string in pack '${JSON.stringify(collPack)}'`);
    }

    return Object.assign({ nbCopies: 1 }, packsByCode.get(collPack.packCode), collPack) as Pack &
      CollectionPack;
  },
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
