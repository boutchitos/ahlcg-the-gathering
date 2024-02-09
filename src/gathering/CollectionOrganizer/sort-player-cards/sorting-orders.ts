export enum PlayerCardsSorters {
  'by-classes',
  'by-player-card-types',
}

export type PlayerCardsSorter = keyof typeof PlayerCardsSorters;
export const DEFAULT_PLAYER_CARDS_SORTING_ORDER = Object.keys(PlayerCardsSorters).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardsSorter[];

export function fixPlayerCardsSortingOrder(wannaBe: string[]): PlayerCardsSorter[] {
  const incoming = new Set(
    wannaBe.filter((sorter) =>
      DEFAULT_PLAYER_CARDS_SORTING_ORDER.includes(sorter as PlayerCardsSorter),
    ),
  );
  if (incoming.size !== DEFAULT_PLAYER_CARDS_SORTING_ORDER.length) {
    return DEFAULT_PLAYER_CARDS_SORTING_ORDER;
  }
  return wannaBe as PlayerCardsSorter[];
}
