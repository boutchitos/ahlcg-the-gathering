import { describe, expect, test } from 'vitest';
import type { Card } from '$gathering/Card';
import { createCollectionOfCards } from '../test-utils/collectionOfCardsFixture';
import { classifyPlayerCards } from './classifyPlayerCards';

describe('given a collection of cards, when they are classified', () => {
  const coreSetCards = createCollectionOfCards('Core Set');
  const classified = classifyPlayerCards(coreSetCards);

  test('then a pure guardian card is classified as such', () => {
    expect(findCardByName(classified.guardian, 'Machete')).toBeDefined();
  });

  test('then a pure mystic card is classified as such', () => {
    expect(findCardByName(classified.mystic, 'Shrivelling')).toBeDefined();
  });

  test('then a pure rogue card is classified as such', () => {
    expect(findCardByName(classified.rogue, 'Switchblade')).toBeDefined();
  });

  test('then a pure seeker card is classified as such', () => {
    expect(findCardByName(classified.seeker, 'Deduction')).toBeDefined();
  });

  test('then a pure survivor card is classified as such', () => {
    expect(findCardByName(classified.survivor, 'Lucky!')).toBeDefined();
  });

  test('then a pure neutral card is classified as such', () => {
    expect(findCardByName(classified.neutral, 'Knife')).toBeDefined();
  });

  test('then all cards are classified only once', () => {
    const allClassifiedCardsCount = Object.values(classified).reduce(
      (sum, current) => (sum += current.length),
      0,
    );
    expect(allClassifiedCardsCount).toEqual([...coreSetCards].length);
  });

  test('then a card specific to an investigator is classified with this investigator', () => {
    const rolandsSpecial = findCardByName([...coreSetCards], "Roland's .38 Special")!;
    expect(rolandsSpecial.playerCardClass).toEqual('neutral');
    expect(findCardByName(classified.guardian, rolandsSpecial.name)).toBeDefined();
  });
});

describe('given a collection of cards containing multi-class cards, when they are classified', () => {
  const theSecretNameCards = createCollectionOfCards('The Secret Name');
  const classified = classifyPlayerCards(theSecretNameCards);

  test('then a multi-class card is classified as such', () => {
    expect(findCardByName(classified.multi, 'Enchanted Blade')).toBeDefined();
  });

  test('then all cards are classified only once', () => {
    const allClassifiedCardsCount = Object.values(classified).reduce(
      (sum, current) => (sum += current.length),
      0,
    );
    expect([...theSecretNameCards]).toHaveLength(22);
    expect(allClassifiedCardsCount).toEqual(22);
  });
});

describe('given a collection of cards containing edge cases, when they are classified', () => {
  const feastOfHemlockValeCards = createCollectionOfCards(
    'The Feast of Hemlock Vale Investigator Expansion',
  );
  const classified = classifyPlayerCards(feastOfHemlockValeCards);

  test('then a bonded card, bonded to a card specific to an investigator, is classified with this investigator ', () => {
    expect(findCardByName(classified.seeker, 'Aetheric Current')).toBeDefined();
  });
});

function findCardByName(cards: Card[], name: string) {
  return cards.find((card) => card.name === name);
}
