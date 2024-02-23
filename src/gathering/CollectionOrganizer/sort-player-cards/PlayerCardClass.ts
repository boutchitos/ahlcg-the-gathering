export enum PlayerCardClasses {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  multi,
  neutral,
  'basic weakness',
}

export type PlayerCardClass = keyof typeof PlayerCardClasses;
