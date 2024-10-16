import { createCardRepository } from '$gathering/CardRepository';
import { theUserCollection, type CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import type { Card, ICardRepository } from '$gathering/ICardRepository';
import type {
  PlayerCardClass,
  ICollectionOrganizer,
  PlayerCardsSorter,
  AssetSlot,
  PlayerCardtype,
} from '$gathering/ICollectionOrganizer';
import { availablePlayerCardClasses } from '$gathering/PlayerCardClass';
import { classifyPlayerCards } from './classify-player-cards/classifyPlayerCards';
import { groupCardsInPockets, GroupPlayerCardsDirectives } from './group-cards-in-pockets';
import type { GroupByTitle } from './group-cards-in-pockets/grouper-config';
import { sortPlayerCards, SortPlayerCardsDirectives } from './sort-player-cards';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();
  private playerCardClassesFilter: PlayerCardClass[] = [];

  constructor(
    private readonly collection: CollectionEntity,
    private readonly sortingDirectives: SortPlayerCardsDirectives,
    private readonly groupingDirectives: GroupPlayerCardsDirectives,
  ) {
    this.organizeCollection();
  }

  filterByClass(playerCardClasses: PlayerCardClass[]): void {
    this.playerCardClassesFilter = playerCardClasses;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  groupBondedCards(groupBondedCards: boolean): void {
    this.groupingDirectives.groupBondedCards = groupBondedCards;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  groupByTitle(groupByTitle: GroupByTitle): void {
    this.groupingDirectives.groupByTitle = groupByTitle;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  groupInvestigatorCards(groupInvestigatorCards: boolean): void {
    this.groupingDirectives.groupInvestigatorCards = groupInvestigatorCards;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  onBinderUpdated(binderOutput: IBinderOutput): void {
    this.binderOutputs.push(binderOutput);
    this.notifyBinderUpdated(binderOutput);
  }

  reorderByClasses(classes: PlayerCardClass[]): void {
    this.sortingDirectives.byClassesOrder = classes;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderByPlayerCardTypes(types: PlayerCardtype[]): void {
    this.sortingDirectives.byPlayerCardTypesOrder = types;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderBySlots(slots: AssetSlot[]): void {
    this.sortingDirectives.assetsBySlotsOrder = slots;
    this.organizeCollection();
    this.notifyBinderUpdated();
  }

  reorderPlayerCardSorters(sorters: PlayerCardsSorter[]) {
    this.sortingDirectives.sortingOrder = sorters;
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
    const classified = classifyPlayerCards(this.investigatorCards);
    const classes = this.playerCardClassesFilter.length
      ? this.playerCardClassesFilter
      : availablePlayerCardClasses;
    let playerCards = new Array<Card>();
    for (const klass of classes) {
      // peu performant... make it works...
      playerCards = playerCards.concat(classified[klass]);
    }
    const sorted = sortPlayerCards(playerCards, this.sortingDirectives);
    const pockets = groupCardsInPockets(sorted, this.groupingDirectives);
    this.binder = { pockets };
  }

  private get investigatorCards(): Iterable<Card> {
    return this.cardRepository.getInvestigatorCards(this.collection.getPacks());
  }
}

export function createCollectionOrganizer(
  sortDirectives = new SortPlayerCardsDirectives(),
  groupDirectives = new GroupPlayerCardsDirectives(),
): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection, sortDirectives, groupDirectives);
}
