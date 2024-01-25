import { createPackRepository } from '../PackRepository';
import { CollectionEntity } from './CollectionEntity';

export { CollectionEntity };
export const theUserCollection = new CollectionEntity(createPackRepository());
