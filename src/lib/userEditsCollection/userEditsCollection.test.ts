import { expect, it } from 'vitest';
import { useCollectionEditor } from './userEditsCollection';

it('has access to all available data packs', () => {
  const { packsStore } = useCollectionEditor();
  let packs;
  packsStore.subscribe((value) => {
    packs = value;
  });

  expect(packs).toEqual([
    expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
    expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
  ]);
});

// it('may adds a data pack to collection', () => {
//   const { packsStore } = useCollectionEditor();
//   let packs;
//   packsStore.subscribe((value) => {
//     packs = value;
//   });

//   const coreSet = packs![0];
//   coreSet.addPackToCollection()

//   expect(packs).toEqual([
//     expect.objectContaining({ howMany: 1, name: 'Core Set', owned: true }),
//     expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//   ]);
// });
