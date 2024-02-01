import type { IBinderOutput } from './IBinderOutput';

export type CLASS = 'guardian' | 'mystic' | 'rogue' | 'seeker' | 'survivor' | 'neutral' | 'multi';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;

  reorderClasses(classes: CLASS[]): void;
}
