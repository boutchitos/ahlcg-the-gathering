import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import { expect } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';
import { CollectionOrganizer } from './CollectionOrganizer';
import { createPackRepository } from '$gathering';
import { SortPlayerCardsDirectives } from './sort-player-cards';

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

export function findPocketWithCard(pockets: Pocket[], name: string) {
  return pockets.find((pocket) => pocket.cards.map((c) => c.name).includes(name));
}

type IndexByName = string;
type IndexByCode = { name: string; code: string }; // we force name for debugabillity
export function indexOfPocketWithCard(pockets: Pocket[], name: IndexByName): number;
export function indexOfPocketWithCard(pockets: Pocket[], { code }: IndexByCode): number;
export function indexOfPocketWithCard(pockets: Pocket[], arg: IndexByName | IndexByCode): number {
  if (typeof arg === 'string') {
    const name = arg;
    return pockets.findIndex((pocket) => pocket.cards.map((c) => c.name).includes(name));
  }
  return pockets.findIndex((pocket) => pocket.cards.map((c) => c.code).includes(arg.code));
}
