import { describe, expect, test } from 'vitest';
import type { Card } from '$gathering/Card';
import { createCollectionOfCards } from '../test-utils/collectionOfCardsFixture';
import { classifyPlayerCards, type ClassifiedPlayerCards } from './classifyPlayerCards';

describe('given a collection of cards, when they are classified', () => {
  const coreSetCards = createCollectionOfCards('Core Set');
  const allClassifiedCards = classifyPlayerCards(coreSetCards);

  test('then basic and straightforward cards are classified accordingly', () => {
    expect(findCardByName(allClassifiedCards.guardian, 'Machete')).toBeDefined();
    expect(findCardByName(allClassifiedCards.mystic, 'Shrivelling')).toBeDefined();
    expect(findCardByName(allClassifiedCards.rogue, 'Switchblade')).toBeDefined();
    expect(findCardByName(allClassifiedCards.seeker, 'Deduction')).toBeDefined();
    expect(findCardByName(allClassifiedCards.survivor, 'Lucky!')).toBeDefined();
    expect(findCardByName(allClassifiedCards.neutral, 'Knife')).toBeDefined();
  });

  test('then all cards are classified only once', () => {
    expect(countCards(allClassifiedCards)).toEqual(coreSetCards.length);
  });

  test('then a card specific to an investigator is classified with its investigator class', () => {
    const rolandsSpecial = findCardByName(coreSetCards, "Roland's .38 Special")!;
    expect(rolandsSpecial.playerCardClass).toEqual('neutral');
    expect(findCardByName(allClassifiedCards.guardian, rolandsSpecial.name)).toBeDefined();
  });
});

describe('given a collection of cards containing multi-class cards, when they are classified', () => {
  const theSecretNameCards = createCollectionOfCards('The Secret Name');
  const allClassifiedCards = classifyPlayerCards(theSecretNameCards);

  test('then a multi-class card is classified as such', () => {
    expect(findCardByName(allClassifiedCards.multi, 'Enchanted Blade')).toBeDefined();
  });

  test('then all cards are classified only once', () => {
    expect(theSecretNameCards).toHaveLength(22);
    expect(countCards(allClassifiedCards)).toEqual(22);
  });
});

describe('given a collection of cards containing bonded cards, when they are classified', () => {
  const feastOfHemlockValeCards = createCollectionOfCards(
    'The Dream-Eaters',
    'The Feast of Hemlock Vale Investigator Expansion',
  );
  const allClassifiedCards = classifyPlayerCards(feastOfHemlockValeCards);

  test('then a weakness bonded card is classified with its bonded to card', () => {
    expect(findCardByName(allClassifiedCards.guardian, 'Bloodlust')).toBeDefined();
  });

  test('then a bonded card, bonded to a card specific to an investigator, is classified with its investigator class', () => {
    expect(findCardByName(allClassifiedCards.mystic, 'Dream-Gate')).toBeDefined();
    expect(findCardByName(allClassifiedCards.seeker, 'Aetheric Current')).toBeDefined();
  });
});

function countCards(allClassifiedCards: ClassifiedPlayerCards) {
  return Object.values(allClassifiedCards).reduce(
    (sum, currentClassCards) => (sum += currentClassCards.length),
    0,
  );
}

function findCardByName(cards: Card[], name: string) {
  return cards.find((card) => card.name === name);
}
