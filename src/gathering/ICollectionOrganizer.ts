import type { IBinderOutput } from './IBinderOutput';

export interface ICollectionOrganizer {
  organizeCollection(binderOutput: IBinderOutput): void;
}
