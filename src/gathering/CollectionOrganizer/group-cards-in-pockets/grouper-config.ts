export enum GroupByTitles {
  'disabled',
  'group-by-title-any-level',
  'group-by-title-same-level',
}

export type GroupByTitle = keyof typeof GroupByTitles;

export class GroupPlayerCardsDirectives {
  private _groupByTitle: GroupByTitle = 'group-by-title-any-level';

  get groupByTitle(): GroupByTitle {
    return this._groupByTitle;
  }

  set groupByTitle(value: string) {
    this._groupByTitle = isGroupByTitle(value) ? value : 'group-by-title-any-level';
  }
}

function isGroupByTitle(wannaBe: string): wannaBe is GroupByTitle {
  return typeof wannaBe === 'string' && Object.keys(GroupByTitles).includes(wannaBe);
}
