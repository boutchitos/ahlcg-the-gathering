import { beforeEach, expect, it } from 'vitest';
import { card, type CardInit } from '../test-utils/card';
import { groupCardsInPockets } from '.';
import type { Card } from '$gathering/Card';
import { GroupPlayerCardsDirectives } from './grouper-config';

let directives: GroupPlayerCardsDirectives;
const cards = [
  card({ name: 'Roland' }),
  card({ name: 'Roland' }),
  card({ name: 'Roland', xp: 2 }),
  card({ name: 'Roland', xp: 2 }),
];

beforeEach(() => {
  directives = new GroupPlayerCardsDirectives();
});

it('may groups cards when they have same title', () => {
  directives.groupByTitle = 'group-by-title-any-level';

  const pockets = group(...cards);

  expect(pockets).toHaveLength(1);
  expect(pockets[0].cards).toHaveLength(4);
});

it('may groups cards when they have same title and same level', () => {
  directives.groupByTitle = 'group-by-title-same-level';

  const pockets = group(...cards);

  expect(pockets).toHaveLength(2);
  expect(pockets[0].cards).toHaveLength(2);
  expect(pockets[1].cards).toHaveLength(2);
});

it('may split cards when they have same title', () => {
  directives.groupByTitle = 'disabled';

  const pockets = group(...cards);

  expect(pockets).toHaveLength(4);
  expect(pockets[0].cards).toHaveLength(1);
  expect(pockets[1].cards).toHaveLength(1);
  expect(pockets[2].cards).toHaveLength(1);
  expect(pockets[3].cards).toHaveLength(1);
});

function group(...cards: CardInit[]) {
  return groupCardsInPockets(cards as Card[], directives);
}
