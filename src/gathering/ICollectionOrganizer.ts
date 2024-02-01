import type { IBinderOutput } from './IBinderOutput';

export interface ICollectionOrganizer {
  onBinderUpdated(binderOutput: IBinderOutput): void;
}
