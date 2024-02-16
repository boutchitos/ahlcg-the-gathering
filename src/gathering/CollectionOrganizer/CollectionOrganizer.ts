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
import { groupCardsInPockets } from './group-cards-in-pockets';
import { sortPlayerCards, SortPlayerCardsDirectives } from './sort-player-cards';

export class CollectionOrganizer implements ICollectionOrganizer {
  private binder: Binder = { pockets: [] };
  private binderOutputs: IBinderOutput[] = [];
  private cardRepository: ICardRepository = createCardRepository();

  constructor(
    private readonly collection: CollectionEntity,
    private readonly sortDirectives: SortPlayerCardsDirectives,
  ) {
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
    const pockets = groupCardsInPockets(sorted);
    this.binder = { pockets };
  }

  private get investigatorCards(): Iterable<Card> {
    return this.cardRepository.getInvestigatorCards(this.collection.getPacks());
  }
}

export function createCollectionOrganizer(
  sortDirectives = new SortPlayerCardsDirectives(),
): ICollectionOrganizer {
  return new CollectionOrganizer(theUserCollection, sortDirectives);
}
