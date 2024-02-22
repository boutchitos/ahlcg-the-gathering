import { expect, it } from 'vitest';
import { setupOrganizer } from './test-utils/setupOrganizer';
import { captor, mockClear } from 'vitest-mock-extended';
import type { Binder } from '$gathering/IBinderOutput';

it('groups investigator required cards, per Deckbuilding Requirement, with investigator card', () => {
  const rolandPocket = setupOrganizer('Core Set').findPocketWithCard('Roland Banks')!;

  expect(rolandPocket.cards[0].name).toEqual('Roland Banks');
  expect(rolandPocket.cards[1].name).toEqual("Roland's .38 Special");
  expect(rolandPocket.cards[2].name).toEqual('Cover Up');
  expect(rolandPocket.cards).toHaveLength(3);
});

it('groups also all copies of all packs (no hard limit for now)', () => {
  const rolandPocket = setupOrganizer('Core Set', 'Core Set').findPocketWithCard('Roland Banks')!;

  expect(rolandPocket.cards[0].name).toEqual('Roland Banks');
  expect(rolandPocket.cards[1].name).toEqual('Roland Banks');
  expect(rolandPocket.cards[2].name).toEqual("Roland's .38 Special");
  expect(rolandPocket.cards[3].name).toEqual("Roland's .38 Special");
  expect(rolandPocket.cards[4].name).toEqual('Cover Up');
  expect(rolandPocket.cards[5].name).toEqual('Cover Up');
  expect(rolandPocket.cards).toHaveLength(6);
});

it('may splits investigator required cards from investigator card', () => {
  const { binderOutput, organizer } = setupOrganizer('Core Set');
  mockClear(binderOutput);

  organizer.groupInvestigatorCards(false);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);

  const rolandPocket = binder.value.pockets[0];
  expect(rolandPocket.cards[0].name).toEqual('Roland Banks');
  expect(rolandPocket.cards).toHaveLength(1);
});
