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

  reorderByClasses(classes: CLASS[]): void;
  reorderByPlayerCardTypes(types: PLAYER_CARD_TYPE[]): void;
  reorderBySlots(slots: SLOT[]): void;
}
