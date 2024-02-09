export enum PlayerCardSorter {
  'by-classes',
  'by-player-card-types',
}

export type PLAYER_CARDS_SORTER = keyof typeof PlayerCardSorter;
export const DEFAULT_PLAYER_CARDS_SORTING_ORDER = Object.keys(PlayerCardSorter).filter((v) =>
  isNaN(Number(v)),
) as PLAYER_CARDS_SORTER[];

export function fixPlayerCardsSortingOrder(wannaBe: string[]): PLAYER_CARDS_SORTER[] {
  const incoming = new Set(
    wannaBe.filter((sorter) =>
      DEFAULT_PLAYER_CARDS_SORTING_ORDER.includes(sorter as PLAYER_CARDS_SORTER),
    ),
  );
  if (incoming.size !== DEFAULT_PLAYER_CARDS_SORTING_ORDER.length) {
    return DEFAULT_PLAYER_CARDS_SORTING_ORDER;
  }
  return wannaBe as PLAYER_CARDS_SORTER[];
}
