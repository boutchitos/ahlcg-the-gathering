import { createCardRepository } from '$gathering';
import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { ICardRepository } from '$gathering/ICardRepository';
import type { ICollectionOrganizer } from '$gathering/ICollectionOrganizer';

export class CollectionOrganizer implements ICollectionOrganizer {
  private cardRepository: ICardRepository = createCardRepository();

  constructor(private collection: CollectionEntity) {}

  organizeCollection(binderOutput: IBinderOutput): void {
    const organized = [...this.investigatorCards].sort(sortCardsAsUserWant);

    const pockets = regroupByPockets(organized);
    binderOutput.binderUpdated({ pockets });
  }

  private get investigatorCards(): Iterable<Card> {
    return this.cardRepository.getInvestigatorCards(this.collection.getPacks());
  }
}

export function createCollectionOrganizer(): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection);
}

export type CollectionPack = {
  nbCopies: number;
  packCode: string; // id?
};

function assert(expr: boolean, help = 'something went wrong!') {
  if (!expr) {
    throw new Error(help);
  }
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

  const slotOrder = [
    'Arcane',
    'Arcane x2',
    'Ally',
    'Ally. Arcane',
    'Accessory',
    'Body',
    'Body. Arcane',
    'Tarot',
    undefined,
  ];

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

function sortPlayerCardsByLocation(a: Card, b: Card): number {
  const aIsLocation = isLocationCard(a);
  const bIsLocation = isLocationCard(b);

  if (aIsLocation !== bIsLocation) {
    return aIsLocation ? 1 : -1; // location at the end
  }

  return 0;
}

function sortPlayerCardsByWeakness(a: Card, b: Card): number {
  const aIsWeakness = isWeaknessCard(a);
  const bIsWeakness = isWeaknessCard(b);

  if (aIsWeakness !== bIsWeakness) {
    return aIsWeakness ? 1 : -1; // weakness at the end
  }

  return 0;
}

function isLocationCard(card: Card) {
  return card.type_code === 'location';
}

function isWeaknessCard(card: Card) {
  const enemy = card.type_code === 'enemy';
  const weakness = card.subtype_code?.includes('weakness');
  return enemy || weakness;
}

// Je pourrais procéder par exception pour sortir de l'algo. dès que je sais le tri.
function sortCardsAsUserWant(a: Card, b: Card) {
  const byWeakness = sortPlayerCardsByWeakness(a, b);
  if (byWeakness !== 0) return byWeakness;

  // I would put locations here after weakness, probably
  // investigator cards that are catched up by pocket regrouping.
  const bylocations = sortPlayerCardsByLocation(a, b);
  if (bylocations !== 0) return bylocations;

  if (!isWeaknessCard(a) && !isLocationCard(a)) {
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
