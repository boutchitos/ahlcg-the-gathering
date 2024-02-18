import { expect, it } from 'vitest';
import { createCardRepository } from '.';

const cardRepository = createCardRepository();

it('can load Core Set', () => {
  expect(getCards('Core Set')).toHaveLength(121);
});

it('removes Random Basic Weakness from Arkham DB', () => {
  const cards = [...cardRepository.getInvestigatorCards(['Core Set'])];

  expect(cards.find(({ name }) => name === 'Random Basic Weakness')).toBeFalsy();
});

it('throws if pack is unknown', () => {
  expect(() => [
    ...cardRepository.getInvestigatorCards(['The Glob That Ate Everything']),
  ]).toThrowError();
});

it('some expansion are emulated', () => {
  // not throwing is already good...
  expect(getCards('The Circle Undone Campaign Expansion')).toBeTruthy();
  expect(getCards('The Circle Undone Investigator Expansion')).toBeTruthy();
  expect(getCards('The Dunwich Legacy Campaign Expansion')).toBeTruthy();
  expect(getCards('The Dunwich Legacy Investigator Expansion')).toBeTruthy();
  expect(getCards('The Forgotten Age Campaign Expansion')).toBeTruthy();
  expect(getCards('The Forgotten Age Investigator Expansion')).toBeTruthy();
  expect(getCards('The Path to Carcosa Campaign Expansion')).toBeTruthy();
  expect(getCards('The Path to Carcosa Investigator Expansion')).toBeTruthy();
});

function getCards(pack: string) {
  return [...cardRepository.getInvestigatorCards([pack])];
}
