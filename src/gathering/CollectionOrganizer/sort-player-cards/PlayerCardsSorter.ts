export enum PlayerCardsSorters {
  'by-classes',
  'by-player-card-types',
}

export type PlayerCardsSorter = keyof typeof PlayerCardsSorters;
