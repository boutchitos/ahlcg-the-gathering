import { expect } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';

import { createPackRepository } from '$gathering';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { findPocketWithCard } from './pockets';
import { CollectionOrganizer } from '../CollectionOrganizer';
import { GroupPlayerCardsDirectives } from '../group-cards-in-pockets/grouper-config';
import { SortPlayerCardsDirectives } from '../sort-player-cards';
import type { ICollectionOrganizer } from '$gathering/ICollectionOrganizer';

export function setupOrganizer(...packs: string[]) {
  const binder = captor<Binder>();
  const collection = createCollection(...packs);
  const { binderOutput, organizer } = createOrganizer(collection);

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const pockets = binder.value.pockets;

  return {
    binder: binder.value,
    binderOutput,
    findPocketWithCard: (name: string) => findPocketWithCard(pockets, name),
    organizer,
  };
}

function createOrganizer(collection: CollectionEntity) {
  const organizer: ICollectionOrganizer = new CollectionOrganizer(
    collection,
    new SortPlayerCardsDirectives(),
    new GroupPlayerCardsDirectives(),
  );
  const binderOutput = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput);
  return { binderOutput, organizer };
}

function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(createPackRepository());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
