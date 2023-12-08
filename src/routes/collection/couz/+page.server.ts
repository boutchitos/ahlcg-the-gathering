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
  code: string;
  displayName: string;
  faction_code: string;
  faction2_code?: string;
  name: string;
  pack_code: string;
  restrictions?: { investigator: Record<string, string> };
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

type Pocket = {
  cards: Card[];
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

// Pour l'instant, ça assume que les cartes avec mêmes noms sont consécutives.
// Je dois regrouper les cartes signatures des investigateurs aussi.
// Le best serait d'avoir un mapping des related cards, et de savoir c'est dans quel pocket.
function regroupByPockets(cards: Card[]): Pocket[] {
  // Si la pocket est un investigator, je devrais retenir sa pocket.
  // Oh! je peux le faire à l'envers. La carte a une restriction qui la ramène sur l'investigator.
  // Cover Up: "restrictions": { "investigator": { "01001": "01001" } },
  // C'est weak pour l'instant, je me fie que les investigateur sont processés avant leurs carte.
  // A fallu je mette les neutrals à la fin. Ça c'est l'ordre UI du user. Devrait pas influencer si
  // jamais je laisse ça varier.
  const pocketsByInvestigator = new Map<string, Pocket>();

  return cards.reduce((pockets: Pocket[], card: Card, currentIndex: number) => {
    if (currentIndex === 0 || card.name !== cards[currentIndex - 1].name) {
      const pocket = { cards: [card] };
      if (card.type_code === 'investigator') {
        pocketsByInvestigator.set(card.code, pocket);
      } else if (card.restrictions?.investigator) {
        // first investigator pocket found for now...
        for (const code of Object.keys(card.restrictions.investigator)) {
          const pocket = pocketsByInvestigator.get(code);
          if (pocket !== undefined) {
            pocket.cards.push(card);
            break;
          }
        }
      }
      pockets.push(pocket);
    } else {
      pockets.at(-1)?.cards.push(card);
    }
    return pockets;
  }, [] as Pocket[]);
}

function sortPlayerCardsByClass(a: Card, b: Card): number {
  const classOrder = ['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral', 'mythos']; // mythos?

  const aClass = classOrder.indexOf(a.faction_code);
  if (aClass === -1) {
    throw new Error(`unknown faction_code ${a.faction_code}`);
  }

  const bClass = classOrder.indexOf(b.faction_code);
  if (bClass === -1) {
    throw new Error(`unknown faction_code ${b.faction_code}`);
  }

  return aClass - bClass;
}

function sortPlayerCardsByType(a: Card, b: Card): number {
  const typeCodeOrder = ['investigator', 'asset', 'event', 'skill', 'story', 'enemy', 'treachery']; // story, enemy???

  const aTypeCode = typeCodeOrder.indexOf(a.type_code);
  if (aTypeCode === -1) {
    throw new Error(`unknown type code ${a.type_code}`);
  }

  const bTypeCode = typeCodeOrder.indexOf(b.type_code);
  if (bTypeCode === -1) {
    throw new Error(`unknown type code ${b.type_code}`);
  }

  return aTypeCode - bTypeCode;
}

function sortAssetCardsBySlot(a: Card, b: Card) {
  // if one is not asset, we can concluded here, so they are the same.
  if (a.type_code !== 'asset' || b.type_code !== 'asset') {
    return 0;
  }

  // I should inject predicate. So, I would find by them. This will be finaly solution when I have
  // configs for everything...
  const aHandheld = a.slot?.includes('Hand');
  const bHandheld = b.slot?.includes('Hand');
  if (aHandheld === true && bHandheld !== true) return -1;
  if (aHandheld !== true && bHandheld === true) return 1;
  if (aHandheld === true && bHandheld === true) return 0;

  const slotOrder = ['Arcane', 'Ally', 'Accessory', 'Body', 'Tarot', undefined];

  const aSlot = slotOrder.indexOf(a.slot);
  if (aSlot === -1) {
    throw new Error(`unknown slot ${a.slot}`);
  }

  const bSlot = slotOrder.indexOf(b.slot);
  if (bSlot === -1) {
    throw new Error(`unknown slot ${b.slot}`);
  }

  return aSlot - bSlot;
}

// Je pourrais procéder par exception pour sortir de l'algo. dès que je sais le tri.
function sortCardsAsUserWant(a: Card, b: Card) {
  const byClass = sortPlayerCardsByClass(a, b);
  if (byClass !== 0) return byClass;

  const byType = sortPlayerCardsByType(a, b);
  if (byType !== 0) return byType;

  const byAssetSlot = sortAssetCardsBySlot(a, b);
  if (byAssetSlot !== 0) return byAssetSlot;

  const name_sort = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
  if (name_sort !== 0) return name_sort;

  const xp_sort = a.xp - b.xp;
  if (xp_sort !== 0) return xp_sort;

  return 0;
}

function cleanAHDBCards() {
  const multiClassTitles = ahdbCards.filter((card) => card.faction2_code).map((card) => card.name);
  const allCards = ahdbCards
    .filter((card) => !['Random Basic Weakness'].includes(card.name))
    .filter((card) => !multiClassTitles.includes(card.name));
  return allCards;
}

const allCards = cleanAHDBCards();

const packsByCode: Map<string, Pack> = getPacksByCode(ahdbPacks);
const cardsByPackCode: Map<string, Card[]> = getCardsByPackCode(allCards);

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

const pockets = regroupByPockets(investigatorCardsCollection);

export const load: PageServerLoad = () => {
  return {
    username: 'Couz',
    packsCollection,
    investigatorCardsCollection,
    pockets,
  };
};
