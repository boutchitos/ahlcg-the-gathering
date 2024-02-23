export enum PlayerCardtypes {
  investigator,
  asset,
  event,
  skill,
}

export type PlayerCardtype = keyof typeof PlayerCardtypes;

export const availablePlayerCardType = Object.keys(PlayerCardtypes).filter((v) =>
  isNaN(Number(v)),
) as PlayerCardtype[];
