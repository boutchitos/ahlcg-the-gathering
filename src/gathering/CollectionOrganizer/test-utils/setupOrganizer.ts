import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { expect } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';
import { CollectionOrganizer } from '../CollectionOrganizer';
import { createPackRepository } from '$gathering';
import { SortPlayerCardsDirectives } from '../sort-player-cards';
import { findPocketWithCard } from './pockets';

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

export function createOrganizer(collection: CollectionEntity) {
  const organizer = new CollectionOrganizer(collection, new SortPlayerCardsDirectives());
  const binderOutput = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput);
  return { binderOutput, organizer };
}

export function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(createPackRepository());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
