import { expect, it } from 'vitest';
import { useCollectionEditor } from './userEditsCollection';

it('has access to all available data packs', () => {
  const { packsStore } = useCollectionEditor();
  let packs;
  packsStore.subscribe((value) => {
    packs = value;
  });

  expect(packs).toEqual(['Core Set', 'Revised Core Set']);
});

it('data packs in collection are owned', () => {});
