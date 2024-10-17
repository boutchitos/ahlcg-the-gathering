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

export const availablePlayerCardClasses = Object.keys(PlayerCardClasses).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardClass[];

export function isPlayerCardClasses(wannabe: string): wannabe is PlayerCardClass {
  return availablePlayerCardClasses.includes(wannabe as PlayerCardClass);
}
