import { beforeEach, expect, it } from 'vitest';
import { userEditsCollectionBundle, type BundleOfPacks, type CardsPack } from './userEditsCollectionBundle';

let allAvailableBundles: BundleOfPacks[];
let ahtcgBundle: BundleOfPacks;
let coreSet: CardsPack;

beforeEach(() => {
  ({ allAvailableBundles } = userEditsCollectionBundle());
  ahtcgBundle = allAvailableBundles[0];
  coreSet = ahtcgBundle.packs[0];
});

it('has access to any available bundle', () => {
  expect(ahtcgBundle.title).toEqual('Arkham Horror: The Card Game');
});

it('has access to any available cards pack in bundle', () => {
  expect(coreSet.name).toEqual('Core Set');
});

// it('has access to all available data packs', () => {
//   expect(packs!).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
//       expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
//       expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//     ]),
//   );
// });

// it('may adds a data pack to collection', () => {
//   const coreSet = packs![0];
//   coreSet.addPackToCollection();

//   expect(packs!).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ howMany: 1, name: 'Core Set', owned: true }),
//       expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
//       expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//     ]),
//   );
// });

// it('may adds data pack to collection multiple times', () => {
//   const coreSet = packs![0];
//   coreSet.addPackToCollection();
//   coreSet.addPackToCollection();

//   expect(packs!).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ howMany: 2, name: 'Core Set', owned: true }),
//       expect.objectContaining({ howMany: 0, name: 'The Dunwich Legacy', owned: false }),
//       expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//     ]),
//   );
// });

// it('may removes a data pack from collection', () => {
//   const dunwich = packs![1];
//   dunwich.addPackToCollection();
//   dunwich.addPackToCollection();

//   dunwich.removePackFromCollection();

//   expect(packs!).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ howMany: 0, name: 'Core Set', owned: false }),
//       expect.objectContaining({ howMany: 1, name: 'The Dunwich Legacy', owned: true }),
//       expect.objectContaining({ howMany: 0, name: 'Revised Core Set', owned: false }),
//     ]),
//   );
// });
