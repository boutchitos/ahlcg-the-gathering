import { createCardRepository } from '$gathering/CardRepository';
import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, Card, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { ICardRepository } from '$gathering/ICardRepository';
import type {
  CLASS,
  ICollectionOrganizer,
  PLAYER_CARD_TYPE,
  PLAYER_CARDS_SORTER,
  SLOT,
} from '$gathering/ICollectionOrganizer';
import { DEFAULT_ASSET_SLOTS_ORDER, DEFAULT_CLASSES, DEFAULT_PLAYER_CARDS_SORTING_ORDER, DEFAULT_PLAYER_CARDTYPES_ORDER, sortPlayerCards } from './sort-player-cards';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();

  private classes = DEFAULT_CLASSES;
  private playerCardTypes = DEFAULT_PLAYER_CARDTYPES_ORDER;
  private slots = DEFAULT_ASSET_SLOTS_ORDER;
  private sorters = DEFAULT_PLAYER_CARDS_SORTING_ORDER;

  constructor(private readonly collection: CollectionEntity) {
    this.classes.sort();
    this.organizeCollection();
  }

  onBinderUpdated(binderOutput: IBinderOutput): void {
    this.binderOutputs.push(binderOutput);
    this.notifyBinderUpdated(binderOutput);
  }

  reorderByClasses(classes: CLASS[]): void {
    this.classes = classes;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): void {
    this.playerCardTypes = types;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderBySlots(slots: SLOT[]): void {
    this.slots = slots;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderPlayerCardSorters(sorters: PLAYER_CARDS_SORTER[]) {
    this.sorters = sorters;
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
    const sorted = sortPlayerCards(this.investigatorCards, {
      byClasses: this.classes,
      assetsBySlots: this.slots,
      byPlayerCardTypes: this.playerCardTypes,
      sortingOrder: this.sorters,
    });

    this.binder = { pockets: regroupByPockets(sorted) };
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
