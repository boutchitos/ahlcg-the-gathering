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
import { groupCardsInPockets, GroupPlayerCardsDirectives } from './group-cards-in-pockets';
import type { GroupByTitle } from './group-cards-in-pockets/grouper-config';
import { sortPlayerCards, SortPlayerCardsDirectives } from './sort-player-cards';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();

  constructor(
    private readonly collection: CollectionEntity,
    private readonly sortingDirectives: SortPlayerCardsDirectives,
    private readonly groupingDirectives: GroupPlayerCardsDirectives,
  ) {
    this.organizeCollection();
  }

  groupByTitle(groupByTitle: GroupByTitle): void {
    this.groupingDirectives.groupByTitle = groupByTitle;
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
    const sorted = sortPlayerCards(this.investigatorCards, this.sortingDirectives);
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
