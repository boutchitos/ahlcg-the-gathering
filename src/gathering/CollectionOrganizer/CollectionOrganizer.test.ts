import { expect, it } from 'vitest';
import { captor, mock, mockClear } from 'vitest-mock-extended';
import type { Binder, IBinderOutput } from '$gathering/IBinderOutput';
import { findPocketWithCard, indexOfPocketWithCard, setup } from './test-utils';
import type { CLASS } from '$gathering/ICollectionOrganizer';
import { DEFAULT_ASSET_SLOTS_ORDER } from './sort-player-cards/by-asset-slots';

it('organizes an empty collection', () => {
  const { binder } = setup();

  expect(binder).toEqual({ pockets: [] });
});

it('organizes a collection with 1x Core Set', () => {
  const knifePocket = setup('Core Set').findPocketWithCard('Knife')!;

  expect(knifePocket.cards).toHaveLength(4);
});

it('organizes a collection with 2x Core Set', () => {
  const knifePocket = setup('Core Set', 'Core Set').findPocketWithCard('Knife')!;

  expect(knifePocket.cards).toHaveLength(8);
});

it('updates many outputs', () => {
  const { organizer } = setup('Core Set');
  const binderOutput2 = mock<IBinderOutput>();
  organizer.onBinderUpdated(binderOutput2);

  const binder = captor<Binder>();
  expect(binderOutput2.binderUpdated).toHaveBeenCalledWith(binder);

  const rolandPocket = findPocketWithCard(binder.value.pockets, 'Roland Banks');
  expect(rolandPocket).toBeDefined();
});

it("doesn't update previously attached outputs while attaching to outputs", () => {
  const { binderOutput, organizer } = setup('Core Set');

  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());
  organizer.onBinderUpdated(mock<IBinderOutput>());

  expect(binderOutput.binderUpdated).toHaveBeenCalledTimes(1);
});

it('updates binder after classes reordering', () => {
  const { binderOutput, organizer } = setup('Core Set');
  mockClear(binderOutput);

  const mysticFirst: CLASS[] = [
    'mystic',
    'guardian',
    'rogue',
    'seeker',
    'survivor',
    'neutral',
    'multi',
  ];
  organizer.reorderByClasses(mysticFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const pockets = binder.value.pockets;
  const cardsOf1stPocket = pockets[0].cards;
  const agnes = cardsOf1stPocket[0];
  expect(agnes.name).toStrictEqual('Agnes Baker');
});

it('updates binder after asset slots reordering', () => {
  const { binderOutput, binder: binderAtSetup, organizer } = setup('Core Set');
  mockClear(binderOutput);

  let allyFirst = [...DEFAULT_ASSET_SLOTS_ORDER];
  allyFirst.splice(allyFirst.indexOf('Ally'), 1);
  allyFirst = ['Ally', ...allyFirst];
  expect(allyFirst[0]).toEqual('Ally');
  expect(allyFirst).toHaveLength(DEFAULT_ASSET_SLOTS_ORDER.length);

  organizer.reorderBySlots(allyFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const indexAtSetup = indexOfPocketWithCard(binderAtSetup.pockets, 'Beat Cop');
  const indexAllyFirst = indexOfPocketWithCard(binder.value.pockets, 'Beat Cop');
  expect(indexAllyFirst).toBeLessThan(indexAtSetup);
});
