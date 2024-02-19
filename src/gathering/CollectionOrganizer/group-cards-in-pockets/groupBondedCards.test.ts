import { beforeEach, expect, it } from 'vitest';
import { card, type CardInit } from '../test-utils/card';
import { groupCardsInPockets } from '.';
import type { Card } from '$gathering/Card';
import { findPocketWithCard } from '../test-utils/pockets';
import { GroupPlayerCardsDirectives } from './grouper-config';

const cardWithBondedCards = card({
  name: 'with bonded',
  code: '1111',
  bonded_cards: [{ code: '2222' }],
});
const cardBondedTo = card({ name: 'bonded to', code: '2222', bonded_to: 'with bonded' });
const cards = [cardWithBondedCards, cardBondedTo];

let directives: GroupPlayerCardsDirectives;

beforeEach(() => {
  directives = new GroupPlayerCardsDirectives();
});

it('groups a bonded card with its related card', () => {
  const pockets = group(...cards);

  expect(findPocketWithCard(pockets, 'with bonded')).toBe(findPocketWithCard(pockets, 'bonded to'));
});

it('groups a bonded cards with its related card, no matter the order of the cards', () => {
  const reversed = cards.reverse();
  const pockets = group(...reversed);

  expect(findPocketWithCard(pockets, 'with bonded')).toBe(findPocketWithCard(pockets, 'bonded to'));
});

it('groups many copies of bonded cards with their related card', () => {
  const pockets = group(cardBondedTo, cardWithBondedCards, cardBondedTo);

  const pocket = findPocketWithCard(pockets, 'with bonded')!;

  expect(pocket.cards[0].name).toEqual('with bonded');
  expect(pocket.cards[1].name).toEqual('bonded to');
  expect(pocket.cards[2].name).toEqual('bonded to');
  expect(pocket.cards).toHaveLength(3);
});

it('may splits bonded card from its related card', () => {
  directives.groupBondedCards = false;

  const pockets = group(...cards);

  expect(findPocketWithCard(pockets, 'with bonded')).not.toBe(
    findPocketWithCard(pockets, 'bonded to'),
  );
});

function group(...cards: CardInit[]) {
  return groupCardsInPockets(cards as Card[], directives);
}
