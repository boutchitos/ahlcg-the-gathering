export enum PlayerCardsSorters {
  'by-classes',
  'by-player-cardtypes',
  'by-names',
}

export type PlayerCardsSorter = keyof typeof PlayerCardsSorters;
