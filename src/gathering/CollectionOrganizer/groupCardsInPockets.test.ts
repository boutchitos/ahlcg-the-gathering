import { expect, it } from 'vitest';
import { setupOrganizer } from './test-utils/setupOrganizer';

it('groups bonded cards with its investigator signature related cards', () => {
  const lukePocket = setupOrganizer('The Dream-Eaters').findPocketWithCard('Luke Robinson')!;

  expect(lukePocket.cards[0].name).toEqual('Luke Robinson');
  expect(lukePocket.cards[1].name).toEqual('Gate Box');
  expect(lukePocket.cards[2].name).toEqual('Detached from Reality');
  expect(lukePocket.cards[3].name).toEqual('Dream-Gate');
  expect(lukePocket.cards).toHaveLength(4);
});
