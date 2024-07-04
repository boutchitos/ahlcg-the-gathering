export enum PlayerCardtypes {
  investigator,
  asset,
  event,
  skill,
}

export type PlayerCardtype = keyof typeof PlayerCardtypes;

export const availablePlayerCardTypes = Object.keys(PlayerCardtypes).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardtype[];
