import { expect, it } from 'vitest';
import { captor, mock, mockClear } from 'vitest-mock-extended';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { setupOrganizer } from './test-utils/setupOrganizer';
import { findPocketWithCard, indexOfPocketWithCard } from './test-utils/pockets';
import {
  DEFAULT_ASSET_SLOTS_ORDER,
  DEFAULT_CLASSES_ORDER,
} from './sort-player-cards/sorter-config';

it('organizes an empty collection', () => {
  const { binder } = setupOrganizer();

  expect(binder).toEqual({ pockets: [] });
});

it('organizes a collection with 1x Core Set', () => {
  const knifePocket = setupOrganizer('Core Set').findPocketWithCard('Knife')!;

  expect(knifePocket.cards).toHaveLength(4);
});

it('organizes a collection with 2x Core Set', () => {
  const knifePocket = setupOrganizer('Core Set', 'Core Set').findPocketWithCard('Knife')!;

  expect(knifePocket.cards).toHaveLength(8);
});

it('updates many outputs', () => {
  const { organizer } = setupOrganizer('Core Set');
  const binderOutput2 = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput2);

  const binder = captor<Binder>();
  expect(binderOutput2.binderUpdated).toHaveBeenCalledWith(binder);

  const rolandPocket = findPocketWithCard(binder.value.pockets, 'Roland Banks');
  expect(rolandPocket).toBeDefined();
});

it("doesn't update previously attached outputs while attaching to outputs", () => {
  const { binderOutput, organizer } = setupOrganizer('Core Set');

  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());

  expect(binderOutput.binderUpdated).toHaveBeenCalledTimes(1);
});

it('updates binder after classes reordering', () => {
  const { binderOutput, organizer } = setupOrganizer('Core Set');
  mockClear(binderOutput);

  const mysticFirst = putItemFirst('mystic', DEFAULT_CLASSES_ORDER);
  organizer.reorderByClasses(mysticFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const agnes = cardsOf1stPocket[0];
  expect(agnes.name).toStrictEqual('Agnes Baker');
});

it('updates binder after asset slots reordering', () => {
  const { binderOutput, binder: binderAtSetup, organizer } = setupOrganizer('Core Set');
  mockClear(binderOutput);

  const allyFirst = putItemFirst('Ally', DEFAULT_ASSET_SLOTS_ORDER);
  organizer.reorderBySlots(allyFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const indexAtSetup = indexOfPocketWithCard(binderAtSetup.pockets, 'Beat Cop');
  const indexAllyFirst = indexOfPocketWithCard(binder.value.pockets, 'Beat Cop');
  expect(indexAllyFirst).toBeLessThan(indexAtSetup);
});

function putItemFirst<T>(item: string, list: T[]): T[] {
  const idx = list.indexOf(item as T);
  expect(idx).not.toEqual(-1);

  const order = [...list];
  order.splice(idx, 1);

  return [item as T, ...order];
}
