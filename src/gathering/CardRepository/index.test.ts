import { expect, it } from 'vitest';
import { createCardRepository } from '.';

it('can load Core Set', () => {
  const cardRepository = createCardRepository();

  const cards = [...cardRepository.getInvestigatorCards(['Core Set'])];

  expect(cards).toHaveLength(103);
});

it('removes Random Basic Weakness from Arkham DB', () => {
  const cardRepository = createCardRepository();

  const cards = [...cardRepository.getInvestigatorCards(['Core Set'])];

  expect(cards.find(({ name }) => name === 'Random Basic Weakness')).toBeFalsy();
});

it('throws if pack is unknown', () => {
  const cardRepository = createCardRepository();

  expect(() => [
    ...cardRepository.getInvestigatorCards(['The Glob That Ate Everything']),
  ]).toThrowError();
});
