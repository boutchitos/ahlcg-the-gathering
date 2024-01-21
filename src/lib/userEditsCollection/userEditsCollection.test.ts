import { expect, it } from 'vitest';
import { useCollectionEditor } from './userEditsCollection';

it('has access to all available data packs', () => {
  let packs;
  const { packsStore } = useCollectionEditor();
  packsStore.subscribe((value) => {
    packs = value;
  });

  expect(packs).toEqual([
    expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
    expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
    expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
  ]);
});

// it('may adds a data pack to collection', () => {
//   let packs: Pack[];
//   const { packsStore } = useCollectionEditor();
//   packsStore.subscribe((value: Pack[]) => {
//     packs = value;
//   });

//   const coreSet = packs![0];
//   coreSet.addPackToCollection();

//   // still doesn't computed owned and howMany...
//   expect(packs!).toEqual([
//     expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
//     expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//   ]);
// });
