export enum PlayerCardClasses {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  neutral,
  multi,
}

export type PlayerCardClass = keyof typeof PlayerCardClasses;
