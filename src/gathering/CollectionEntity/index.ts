import { CollectionEntity } from './CollectionEntity';
import { createPackRepository } from '../PackRepository';

export { CollectionEntity };
export const theUserCollection = new CollectionEntity(createPackRepository());
