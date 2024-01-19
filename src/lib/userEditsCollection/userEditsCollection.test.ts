import { expect, it } from 'vitest';
import { useCollectionEditor } from './userEditsCollection';

it('has access to all available data packs', () => {
  const { packsStore } = useCollectionEditor();
  let packs;
  packsStore.subscribe((value) => {
    packs = value;
  });

  expect(packs).toEqual([
    { howMany: 1, name: 'Core Set', owned: true },
    { howMany: 0, name: 'Revised Core Set', owned: false },
  ]);
});

it('data packs in collection are owned', () => {});
