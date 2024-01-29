import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { ICollectionOrganizer } from '$gathering/ICollectionOrganizer';
import ahdbCards from '$gathering/ahdb.cards.json';

export class CollectionOrganizer implements ICollectionOrganizer {
  constructor(private collection: CollectionEntity) {}

  organizeCollection(binderOutput: IBinderOutput): void {
    const allCards = cleanAHDBCards();
    const cardsByPackName: Map<string, Card[]> = getCardsByPackName(allCards);
    const investigatorCardsCollection = getInvestigatorCards(cardsByPackName, this.collection).sort(
      sortCardsAsUserWant,
    );

    const pockets = regroupByPockets(investigatorCardsCollection);
    binderOutput.binderUpdated({ pockets });
  }
}

export function createCollectionOrganizer(): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection);
}

export type CollectionPack = {
  nbCopies: number;
  packCode: string; // id?
};

export type Pack = {
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

function assert(expr: boolean, help = 'something went wrong!') {
  if (!expr) {
    throw new Error(help);
  }
}

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

function getInvestigatorCards(cardsByPackName: Map<string, Card[]>, collection: CollectionEntity) {
  const cards = new Array<Card[]>();
  for (const packName of collection.getPacks()) {
    const cardsInPack = cardsByPackName.get(packName);
    if (cardsInPack === undefined) {
      // Carnevale of Horrors n'a pas de cartes investigator.
      // Je me rends compte que je dois donner 'encounter=1' à l'API pour avoir toutes les cartes.
      // Ceci dit, j'ai cherché dans les cartes qui devraient seulement être investigator, et je
      // trouve des '"faction_code": "mythos"'. C'est étrange et à démêler plus tard.
      // Je viens d'en trouver la cause. Ça vient du pack guardians et ce sont des story qui tant
      // qu'à moi, ne vont pas dans les player cards. Le throw ici est mal inséré. Car le pack
      // existe, mais n'a pas de carte.
      if (['coh', 'lol', 'guardians'].includes(packName)) {
        continue;
      }
      throw new Error(`unknown pack '${packName}' in collection`);
    }
    cards.push(cardsInPack);
  }
  return cards.flat();
}

function regroupByPockets(cards: Card[]): Pocket[] {
  const pocketsByInvestigator = new Map<string, Pocket>();
  const pocketsByName = new Map<string, Pocket>();
  const pocketsByBoundedCard = new Map<string, Pocket>();

  return cards.reduce((pockets: Pocket[], card) => {
    let pocket: Pocket | undefined;

    if (pocketsByName.has(card.name)) {
      pocket = pocketsByName.get(card.name);
    } else if (card.restrictions !== undefined) {
      for (const code of Object.keys(card.restrictions.investigator)) {
        pocket = pocketsByInvestigator.get(code);
        if (pocket !== undefined) {
          break;
        }
      }
      assert(pocket !== undefined, `should have found pocket for card  ${card.name}`);
    } else if (card.bonded_to !== undefined) {
      pocket = pocketsByBoundedCard.get(card.code);
      assert(pocket !== undefined, `we should have found a pocket for bonded card ${card.name}`);
    }

    if (pocket === undefined) {
      pocket = { cards: [] };

      pocketsByName.set(card.name, pocket);

      if (card.type_code === 'investigator') {
        pocketsByInvestigator.set(card.code, pocket);
      }

      if (card.bonded_cards !== undefined) {
        assert(card.bonded_cards.length === 1);
        pocketsByBoundedCard.set(card.bonded_cards[0].code, pocket);
      }

      pockets.push(pocket);
    }

    pocket.cards.push(card);

    return pockets;
  }, []);
}

function sortPlayerCardsByClass(a: Card, b: Card): number {
  const classOrder = ['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral'];

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

function sortPlayerCardsByType(a: Card, b: Card): number {
  const typeCodeOrder = ['investigator', 'asset', 'event', 'skill'];

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

function sortPlayerCardsByWeakness(a: Card, b: Card): number {
  const aIsWeakness = a.subtype_code?.includes('weakness');
  const bIsWeakness = b.subtype_code?.includes('weakness');

  if (aIsWeakness !== bIsWeakness) {
    return aIsWeakness ? 1 : -1; // weakness at the end
  }

  return 0;
}

// Je pourrais procéder par exception pour sortir de l'algo. dès que je sais le tri.
function sortCardsAsUserWant(a: Card, b: Card) {
  const byWeakness = sortPlayerCardsByWeakness(a, b);
  if (byWeakness !== 0) return byWeakness;

  if (!a.subtype_code?.includes('weakness')) {
    const byClass = sortPlayerCardsByClass(a, b);
    if (byClass !== 0) return byClass;

    const byType = sortPlayerCardsByType(a, b);
    if (byType !== 0) return byType;

    const byAssetSlot = sortAssetCardsBySlot(a, b);
    if (byAssetSlot !== 0) return byAssetSlot;
  }

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
    .filter((card) => !multiClassTitles.includes(card.name))
    .filter((card) => !card.code.match(/[0-9]+b/));
  return allCards;
}
