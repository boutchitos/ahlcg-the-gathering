import { createCardRepository } from '$gathering';
import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { ICardRepository } from '$gathering/ICardRepository';
import type { CLASS, ICollectionOrganizer, SLOT } from '$gathering/ICollectionOrganizer';
import { sortByClasses, type ICardsSorter } from './sort-cards-by';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();
  private classes: CLASS[] = [
    'guardian',
    'mystic',
    'rogue',
    'seeker',
    'survivor',
    'neutral',
    'multi',
  ];
  private slots: SLOT[] = [
    'Arcane',
    'Arcane x2',
    'Hand',
    'Hand x2',
    'Hand. Arcane',
    'Hand x2. Arcane',
    'Ally',
    'Ally. Arcane',
    'Accessory',
    'Body',
    'Body. Arcane',
    'Body. Hand x2',
    'Tarot',
    undefined,
  ];

  constructor(private readonly collection: CollectionEntity) {
    this.classes.sort();
    this.organizeCollection();
  }

  onBinderUpdated(binderOutput: IBinderOutput): void {
    this.binderOutputs.push(binderOutput);
    this.notifyBinderUpdated(binderOutput);
  }

  reorderClasses(classes: CLASS[]): void {
    this.classes = classes;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderSlots(slots: SLOT[]): void {
    this.slots = slots;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  private notifyBinderUpdated(output?: IBinderOutput): void {
    const outputs = output !== undefined ? [output] : this.binderOutputs;
    outputs.forEach((output) => {
      const copy: Binder = { pockets: [...this.binder.pockets] };
      output.binderUpdated(copy);
    });
  }

  private organizeCollection(): void {
    const cardsSorters = new Array<ICardsSorter>();
    const byClass = sortByClasses(this.classes);
    const byAssetSlot = new SortCardsByAssetSlot(this.slots);
    cardsSorters.push(byClass, byAssetSlot);

    const organized = [...this.investigatorCards].sort((a, b) =>
      sortCardsAsUserWant(a, b, cardsSorters),
    );

    this.binder = { pockets: regroupByPockets(organized) };
  }

  private get investigatorCards(): Iterable<Card> {
    return this.cardRepository.getInvestigatorCards(this.collection.getPacks());
  }
}

export function createCollectionOrganizer(): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection);
}

function assert(expr: boolean, help = 'something went wrong!') {
  if (!expr) {
    throw new Error(help);
  }
}

function regroupByPockets(cards: Card[]): Pocket[] {
  const pocketsByInvestigator = new Map<string, Pocket>();
  const pocketsByName = new Map<string, Pocket>();
  const pocketsByBoundedCard = new Map<string, Pocket>();

  const bondedToCards: Card[] = [];
  const cardsWithRestrictions: Card[] = [];

  const regrouped = cards.reduce((pockets: Pocket[], card) => {
    let pocket: Pocket | undefined;

    if (pocketsByName.has(card.name)) {
      pocket = pocketsByName.get(card.name);
    } else if (card.restrictions !== undefined) {
      cardsWithRestrictions.push(card);
      return pockets;
    } else if (card.bonded_to !== undefined) {
      bondedToCards.push(card);
      return pockets;
    }

    if (pocket === undefined) {
      pocket = { cards: [] };

      pocketsByName.set(card.name, pocket);

      if (card.type_code === 'investigator') {
        pocketsByInvestigator.set(card.code, pocket);
      }

      if (card.bonded_cards !== undefined) {
        card.bonded_cards.forEach((bondedCard) => {
          pocketsByBoundedCard.set(bondedCard.code, pocket!);
        });
      }

      pockets.push(pocket);
    }

    for (let i = 0; i < card.quantity; ++i) {
      pocket!.cards.push(card);
    }

    return pockets;
  }, []);

  cardsWithRestrictions.forEach((card) => {
    for (const code of Object.keys(card.restrictions!.investigator)) {
      const pocket = pocketsByInvestigator.get(code);
      if (pocket !== undefined) {
        pocket.cards.push(card);
        if (card.bonded_cards !== undefined) {
          card.bonded_cards.forEach((bondedCard) => {
            pocketsByBoundedCard.set(bondedCard.code, pocket!);
          });
        }
        break;
      }
    }
  });

  bondedToCards.forEach((card) => {
    const pocket = pocketsByBoundedCard.get(card.code);
    assert(pocket !== undefined, `we should have found a pocket for bonded card ${card.name}`);

    for (let i = 0; i < card.quantity; ++i) {
      pocket!.cards.push(card);
    }
  });

  return regrouped;
}

function toSlot(card: Card): SLOT {
  return card.slot as SLOT;
}

class SortCardsByAssetSlot implements ICardsSorter {
  constructor(private slots: SLOT[]) {}

  sortCards(a: Card, b: Card): number {
    return sortAssetCardsBySlot(a, b, this.slots);
  }
}

function sortAssetCardsBySlot(a: Card, b: Card, slots: SLOT[]) {
  // if one is not asset, we can concluded here, so they are the same.
  if (a.type_code !== 'asset' || b.type_code !== 'asset') {
    return 0;
  }

  // handheld will be a config, not yet, but this is for me.
  // // I should inject predicate. So, I would find by them. This will be finaly solution when I have
  // // configs for everything...
  // const aHandheld = a.slot?.includes('Hand');
  // const bHandheld = b.slot?.includes('Hand');
  // if (aHandheld === true && bHandheld !== true) return -1;
  // if (aHandheld !== true && bHandheld === true) return 1;
  // if (aHandheld === true && bHandheld === true) return 0;

  const aSlot = slots.indexOf(toSlot(a));
  if (aSlot === -1) {
    throw new Error(`unknown slot ${a.slot}`);
  }

  const bSlot = slots.indexOf(toSlot(b));
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
function sortCardsAsUserWant(a: Card, b: Card, sorters: ICardsSorter[]) {
  const byWeakness = sortPlayerCardsByWeakness(a, b);
  if (byWeakness !== 0) return byWeakness;

  // I would put locations here after weakness, probably
  // investigator cards that are catched up by pocket regrouping.
  // yup for now : Luke Robinson
  const bylocations = sortPlayerCardsByLocation(a, b);
  if (bylocations !== 0) return bylocations;

  if (!isWeaknessCard(a) && !isLocationCard(a)) {
    const byClass = sorters[0].sortCards(a, b);
    if (byClass !== 0) return byClass;

    const byType = sortPlayerCardsByType(a, b);
    if (byType !== 0) return byType;

    const byAssetSlot = sorters[1].sortCards(a, b);
    if (byAssetSlot !== 0) return byAssetSlot;
  }

  const name_sort = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
  if (name_sort !== 0) return name_sort;

  const xp_sort = a.xp - b.xp;
  if (xp_sort !== 0) return xp_sort;

  return 0;
}
