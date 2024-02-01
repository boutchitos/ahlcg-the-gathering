import { beforeEach, expect, it } from 'vitest';
import { CollectionEntity } from '$gathering/CollectionEntity';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { CollectionOrganizer } from './CollectionOrganizer';
import { PackRepositoryMock } from './PackRepositoryMock';

class BinderOutput implements IBinderOutput {
  binder: Binder = { pockets: [] };

  binderUpdated(binder: Binder): void {
    this.binder = binder;
  }
}

let binderOutput: BinderOutput;

beforeEach(() => {
  binderOutput = new BinderOutput();
});

it('organizes an empty collection', () => {
  const organizer = new CollectionOrganizer(createCollection());
  organizer.onBinderUpdated(binderOutput);

  expect(binderOutput.binder.pockets).toStrictEqual([]);
});

it('organizes a collection with 1x Core Set', () => {
  const organizer = new CollectionOrganizer(createCollection('Core Set'));
  organizer.onBinderUpdated(binderOutput);

  const cardsOf1stPocket = binderOutput.binder.pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(1);
});

it('organizes a collection with 2x Core Set', () => {
  const organizer = new CollectionOrganizer(createCollection('Core Set', 'Core Set'));
  organizer.onBinderUpdated(binderOutput);

  const cardsOf1stPocket = binderOutput.binder.pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(2);
});

function createCollection(...packs: string[]) {
  const collection = new CollectionEntity(new PackRepositoryMock());
  packs.forEach((pack) => collection.addPack(pack));
  return collection;
}
