import { beforeEach, expect, it } from 'vitest';
import { captor, CaptorMatcher, mock, mockClear, type MockProxy } from 'vitest-mock-extended';
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
  const binderOutput2 = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput2);

  expect(binderOutput2.binderUpdated).toHaveBeenCalledWith(binder);

  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  expect(roland.name).toStrictEqual('Roland Banks');
});

it("doesn't update previously attached outputs while attaching to outputs", () => {
  const organizer = createOrganizer(createCollection('Core Set'));

  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());

  expect(binderOutput.binderUpdated).toHaveBeenCalledTimes(1);
});

it('updates binder after classes reordering', () => {
  const organizer = createOrganizer(createCollection('Core Set'));
  mockClear(binderOutput);

  organizer.reorderClasses([
    'mystic',
    'guardian',
    'rogue',
    'seeker',
    'survivor',
    'neutral',
    'multi',
  ]);

  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const agnes = cardsOf1stPocket[0];
  expect(agnes.name).toStrictEqual('Agnes Baker');
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
