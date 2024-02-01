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
  createOrganizer(createCollection());

  expect(binderOutput.binder.pockets).toStrictEqual([]);
});

it('organizes a collection with 1x Core Set', () => {
  createOrganizer(createCollection('Core Set'));

  const cardsOf1stPocket = binderOutput.binder.pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(1);
});

it('organizes a collection with 2x Core Set', () => {
  createOrganizer(createCollection('Core Set', 'Core Set'));

  const cardsOf1stPocket = binderOutput.binder.pockets[0].cards;
  const roland = cardsOf1stPocket[0];
  const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
  expect(roland.name).toStrictEqual('Roland Banks');
  expect(copies).toHaveLength(2);
});

it('updates many outputs', () => {
  const orgaznier = createOrganizer(createCollection('Core Set'));

  const binderOutput2 = new BinderOutput();
  orgaznier.onBinderUpdated(binderOutput2);

  {
    const cardsOf1stPocket = binderOutput.binder.pockets[0].cards;
    const roland = cardsOf1stPocket[0];
    const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
    expect(roland.name).toStrictEqual('Roland Banks');
    expect(copies).toHaveLength(1);
  }
  {
    const cardsOf1stPocket = binderOutput2.binder.pockets[0].cards;
    const roland = cardsOf1stPocket[0];
    const copies = cardsOf1stPocket.filter((card) => card.name === 'Roland Banks');
    expect(roland.name).toStrictEqual('Roland Banks');
    expect(copies).toHaveLength(1);
  }
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
