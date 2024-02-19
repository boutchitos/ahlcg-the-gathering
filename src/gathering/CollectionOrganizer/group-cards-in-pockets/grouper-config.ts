export enum GroupByTitles {
  'disabled',
  'group-by-title-any-level',
  'group-by-title-same-level',
}

export type GroupByTitle = keyof typeof GroupByTitles;

export class GroupPlayerCardsDirectives {
  public groupByTitle: GroupByTitle = 'group-by-title-any-level';
}
