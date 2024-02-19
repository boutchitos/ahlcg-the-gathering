import { beforeEach, expect, it } from 'vitest';
import { card, type CardInit } from '../test-utils/card';
import { groupCardsInPockets } from '.';
import type { Card } from '$gathering/Card';
import { GroupPlayerCardsDirectives } from './grouper-config';

let directives: GroupPlayerCardsDirectives;
const cards = [card({ name: 'Roland' }), card({ name: 'Roland' })];

beforeEach(() => {
  directives = new GroupPlayerCardsDirectives();
});

it('may groups cards when they have same title', () => {
  directives.groupCardsIfSameTitle = true;

  const pockets = group(...cards);

  expect(pockets).toHaveLength(1);
  expect(pockets[0].cards).toHaveLength(2);
});

it('may split cards when they have same title', () => {
  directives.groupCardsIfSameTitle = false;

  const pockets = group(...cards);

  expect(pockets).toHaveLength(2);
  expect(pockets[0].cards).toHaveLength(1);
  expect(pockets[1].cards).toHaveLength(1);
});

function group(...cards: CardInit[]) {
  return groupCardsInPockets(cards as Card[], directives);
}
