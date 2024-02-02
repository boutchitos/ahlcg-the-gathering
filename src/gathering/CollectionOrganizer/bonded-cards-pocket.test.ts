import { expect, it } from 'vitest';
import { captor, mock } from 'vitest-mock-extended';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { IBinderOutput } from '$gathering/IBinderOutput';
import { CollectionOrganizer } from './CollectionOrganizer';
import { createPackRepository } from '$gathering';

it('regroups bonded card with its related card', () => {
  const { hallowedMirror } = setup('Before the Black Throne');

  expect(hallowedMirror.cards[0].name).toEqual('Hallowed Mirror');
  expect(hallowedMirror.cards[1].name).toEqual('Soothing Melody');
  expect(hallowedMirror.cards[2].name).toEqual('Soothing Melody');
  expect(hallowedMirror.cards[3].name).toEqual('Soothing Melody');
  expect(hallowedMirror.cards).toHaveLength(4);
});

function setup(...packs: string[]) {
  const collection = createCollection(...packs);
  const { binderOutput } = createOrganizer(collection);
  const binder = captor();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);

  return { hallowedMirror: binder.value.pockets[0] };
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
