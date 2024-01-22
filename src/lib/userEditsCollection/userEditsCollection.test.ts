import { beforeEach, expect, it } from 'vitest';
import { useCollectionEditor, type CardsPack } from './userEditsCollection';

let packs: CardsPack[];

beforeEach(() => {
  packs = [];

  const { packsStore } = useCollectionEditor();
  packsStore.subscribe((value: CardsPack[]) => {
    packs = value;
  });
});

it('has access to all available data packs', () => {
  expect(packs!).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
      expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
      expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
    ]),
  );
});

it('may adds a data pack to collection', () => {
  const coreSet = packs![0];
  coreSet.addPackToCollection();

  expect(packs!).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ howMany: 1, name: 'Core Set', owned: true }),
      expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
      expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
    ]),
  );
});

it('may adds data pack to collection multiple times', () => {
  const coreSet = packs![0];
  coreSet.addPackToCollection();
  coreSet.addPackToCollection();

  expect(packs!).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ howMany: 2, name: 'Core Set', owned: true }),
      expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
      expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
    ]),
  );
});

it('may removes a data pack from collection', () => {
  const dunwich = packs![1];
  dunwich.addPackToCollection();
  dunwich.addPackToCollection();

  dunwich.removePackFromCollection();

  expect(packs!).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
      expect.objectContaining({ howMany: 1, name: 'The Dunwich Legacy', owned: true }),
      expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
    ]),
  );
});
