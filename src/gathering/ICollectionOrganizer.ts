import type { IBinderOutput } from './IBinderOutput';

export type CLASS = 'guardian' | 'mystic' | 'rogue' | 'seeker' | 'survivor' | 'neutral' | 'multi';
export type PLAYER_CARD_TYPE = 'investigator' | 'asset' | 'event' | 'skill';
export type SLOT =
  | 'Accessory'
  | 'Ally. Arcane'
  | 'Ally'
  | 'Arcane x2'
  | 'Arcane'
  | 'Body. Arcane'
  | 'Body. Hand x2'
  | 'Body'
  | 'Hand x2. Arcane'
  | 'Hand x2'
  | 'Hand. Arcane'
  | 'Hand'
  | 'Tarot'
  | undefined;

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderClasses(classes: CLASS[]): void;
  reorderSlots(slots: SLOT[]): void;
}
