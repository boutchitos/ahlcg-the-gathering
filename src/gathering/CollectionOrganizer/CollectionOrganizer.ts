import { createCardRepository } from '$gathering/CardRepository';
import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, PocketCard, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import type { Card, ICardRepository } from '$gathering/ICardRepository';
import type {
  PlayerCardClass,
  ICollectionOrganizer,
  PlayerCardsSorter,
  AssetSlot,
  PlayerCardtype,
} from '$gathering/ICollectionOrganizer';
import { sortPlayerCards, SortPlayerCardsDirectives } from './sort-player-cards';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();
  private sortDirectives: SortPlayerCardsDirectives;

  constructor(private readonly collection: CollectionEntity, sortDirectives: SortPlayerCardsDirectives) {
    this.sortDirectives = sortDirectives;
    this.organizeCollection();
  }

  onBinderUpdated(binderOutput: IBinderOutput): void {
    this.binderOutputs.push(binderOutput);
    this.notifyBinderUpdated(binderOutput);
  }

  reorderByClasses(classes: PlayerCardClass[]): void {
    this.sortDirectives.byClassesOrder = classes;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderByPlayerCardTypes(types: PlayerCardtype[]): void {
    this.sortDirectives.byPlayerCardTypesOrder = types;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderBySlots(slots: AssetSlot[]): void {
    this.sortDirectives.assetsBySlotsOrder = slots;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]) {
    this.sortDirectives.sortingOrder = sorters;
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
    const sorted = sortPlayerCards(this.investigatorCards, this.sortDirectives);

    this.binder = { pockets: regroupByPockets(sorted) };
  }

  private get investigatorCards(): Iterable<Card> {
    return this.cardRepository.getInvestigatorCards(this.collection.getPacks());
  }
}

export function createCollectionOrganizer(sortDirectives = new SortPlayerCardsDirectives()): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection, sortDirectives);
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
      pocket!.cards.push(toPocketCard(card));
    }

    return pockets;
  }, []);

  cardsWithRestrictions.forEach((card) => {
    for (const code of Object.keys(card.restrictions!.investigator)) {
      const pocket = pocketsByInvestigator.get(code);
      if (pocket !== undefined) {
        pocket.cards.push(toPocketCard(card));
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
      pocket!.cards.push(toPocketCard(card));
    }
  });

  return regrouped;
}

function toPocketCard(card: Card): PocketCard {
  const { code, name, xp } = card;
  return {
    code,
    image: {
      landscape: card.type_code === 'investigator',
      url: `https://arkhamdb.com${card.imagesrc}`,
    },
    name,
    xp,
  };
}
