export enum Classes {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  neutral,
  multi,
}

export type CLASS = keyof typeof Classes;
