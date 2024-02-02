import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import { expect } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';
import { CollectionOrganizer } from './CollectionOrganizer';
import { createPackRepository } from '$gathering';

export function setup(...packs: string[]) {
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
  const organizer = new CollectionOrganizer(collection);
  const binderOutput = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput);
  return { binderOutput, organizer };
}

export function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(createPackRepository());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}

export function findPocketWithCard(pockets: Pocket[], name: string) {
  return pockets.find((pocket) => pocket.cards.map((c) => c.name).includes(name));
}
