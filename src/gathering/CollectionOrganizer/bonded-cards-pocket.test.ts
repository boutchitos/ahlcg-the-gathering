import { expect, it } from 'vitest';
import { setup } from './test-utils';

it('regroups bonded cards with its related card', () => {
  const hallowedMirrorPocket =
    setup('Before the Black Throne').findPocketWithCard('Hallowed Mirror')!;

  expect(hallowedMirrorPocket.cards[0].name).toEqual('Hallowed Mirror');
  expect(hallowedMirrorPocket.cards[1].name).toEqual('Soothing Melody');
  expect(hallowedMirrorPocket.cards[2].name).toEqual('Soothing Melody');
  expect(hallowedMirrorPocket.cards[3].name).toEqual('Soothing Melody');
  expect(hallowedMirrorPocket.cards).toHaveLength(4);
});

it('regroups bonded card with all its related cards', () => {
  const missDoylePocket = setup('The Dream-Eaters').findPocketWithCard('Miss Doyle')!;

  expect(missDoylePocket.cards[0].name).toEqual('Miss Doyle');
  expect(missDoylePocket.cards[1].name).toEqual('Augur');
  expect(missDoylePocket.cards[2].name).toEqual('Hope');
  expect(missDoylePocket.cards[3].name).toEqual('Zeal');
  expect(missDoylePocket.cards).toHaveLength(4);
});

it('regroups bonded cards with its investigator signature related cards', () => {
  const lukePocket = setup('The Dream-Eaters').findPocketWithCard('Luke Robinson')!;

  expect(lukePocket.cards[0].name).toEqual('Luke Robinson');
  expect(lukePocket.cards[1].name).toEqual('Gate Box');
  expect(lukePocket.cards[2].name).toEqual('Detached from Reality');
  expect(lukePocket.cards[3].name).toEqual('Dream-Gate');
  expect(lukePocket.cards).toHaveLength(4);
});
