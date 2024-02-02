import { CollectionEntity } from "$gathering/CollectionEntity";
import type { Binder, IBinderOutput } from "$gathering/IBinderOutput";
import { expect } from "vitest";
import { captor, mock } from "vitest-mock-extended";
import { CollectionOrganizer } from "./CollectionOrganizer";
import { createPackRepository } from "$gathering";

export function setup(...packs: string[]) {
  const binder = captor<Binder>();
  const collection = createCollection(...packs);
  const { binderOutput } = createOrganizer(collection);

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const pockets = binder.value.pockets;

  return {
    findPocketWithCard: (name: string) =>
      pockets.find((pocket) => pocket.cards.map((c) => c.name).includes(name)),
  };
}

export function createOrganizer(collection: CollectionEntity) {
  const organizer = new CollectionOrganizer(collection);
  const binderOutput = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput);
  return { binderOutput };
}

export function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(createPackRepository());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
