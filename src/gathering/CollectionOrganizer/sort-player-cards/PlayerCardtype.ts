export enum PlayerCardtypes {
  investigator,
  asset,
  event,
  skill,
}

export type PlayerCardtype = keyof typeof PlayerCardtypes;
