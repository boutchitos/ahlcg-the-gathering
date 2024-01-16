import { expect, test } from 'vitest';
import { addPack } from './addRemovePack';

test('adds one pack to Collection', () => {
  const collection: string[] = [];

  expect(addPack(collection, 'Core Set')).toEqual(['Core Set']);
  expect(addPack(collection, 'The Dunwich Legacy')).toEqual(['Core Set', 'The Dunwich Legacy']);
});

test('may adds more than once', () => {
  const collection: string[] = [];

  expect(addPack(collection, 'Core Set')).toEqual(['Core Set']);
  expect(addPack(collection, 'Core Set')).toEqual(['Core Set', 'Core Set']);
});
