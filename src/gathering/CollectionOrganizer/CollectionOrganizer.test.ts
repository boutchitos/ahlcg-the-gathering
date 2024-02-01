import { beforeEach, expect, it } from 'vitest';
import { captor, CaptorMatcher, mock, type MockProxy } from 'vitest-mock-extended';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { CollectionOrganizer } from './CollectionOrganizer';
import { PackRepositoryMock } from './PackRepositoryMock';

let binder: CaptorMatcher<Binder>;
let binderOutput: MockProxy<IBinderOutput>;

beforeEach(() => {
  binderOutput = mock();
  binder = captor();
});

it('organizes an empty collection', () => {
  createOrganizer(createCollection());

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  expect(binder.value).toEqual({ pockets: [] });
});

it('organizes a collection with 1x Core Set', () => {
  createOrganizer(createCollection('Core Set'));

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);

  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(1);
});

it('organizes a collection with 2x Core Set', () => {
  createOrganizer(createCollection('Core Set', 'Core Set'));

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);

  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(copies).toHaveLength(2);
});

it('updates many outputs', () => {
  const organizer = createOrganizer(createCollection('Core Set'));
  const output2 = mock<IBinderOutput>();
  organizer.onBinderUpdated(output2);

  expect(output2.binderUpdated).toHaveBeenCalledWith(binder);

  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(1);
});

function createOrganizer(collection: CollectionEntity) {
  const organizer = new CollectionOrganizer(collection);
  organizer.onBinderUpdated(binderOutput);
  return organizer;
}

function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(new PackRepositoryMock());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
