import { expect, it } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { IBinderOutput, Pocket } from '$gathering/IBinderOutput';
import { CollectionOrganizer } from './CollectionOrganizer';
import { createPackRepository } from '$gathering';

let roland: Pocket;

it('regroups investigator required cards, per Deckbuilding Requirement, with investigator card', () => {
  const { roland } = setup('Core Set');

  expect(roland.cards[0].name).toEqual('Roland Banks');
  expect(roland.cards[1].name).toEqual("Roland's .38 Special");
  expect(roland.cards[2].name).toEqual('Cover Up');
  expect(roland.cards).toHaveLength(3);
});

it('regroups also all copies of all packs (no hard limit for now)', () => {
  const { roland } = setup('Core Set', 'Core Set');

  expect(roland.cards[0].name).toEqual('Roland Banks');
  expect(roland.cards[1].name).toEqual('Roland Banks');
  expect(roland.cards[2].name).toEqual("Roland's .38 Special");
  expect(roland.cards[3].name).toEqual("Roland's .38 Special");
  expect(roland.cards[4].name).toEqual('Cover Up');
  expect(roland.cards[5].name).toEqual('Cover Up');
  expect(roland.cards).toHaveLength(6);
});

function setup(...packs: string[]) {
  const collection = createCollection(...packs);
  const { binderOutput } = createOrganizer(collection);
  const binder = captor();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  roland = binder.value.pockets[0];

  return { roland };
}

function createOrganizer(collection: CollectionEntity) {
  const organizer = new CollectionOrganizer(collection);
  const binderOutput = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput);
  return { binderOutput };
}

function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(createPackRepository());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
