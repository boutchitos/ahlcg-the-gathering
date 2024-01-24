import { beforeEach, expect, it } from 'vitest';
import {
  userEditsItsCollection,
  type BundleOfPacks,
  type CardsPack,
} from './userEditsItsCollection';

let allAvailableBundles: BundleOfPacks[];
let ahtcgBundle: BundleOfPacks;
let coreSet: CardsPack;
let howManyCoreSet: number;

beforeEach(() => {
  ({ allAvailableBundles } = userEditsItsCollection());
  ahtcgBundle = allAvailableBundles[0];
  coreSet = ahtcgBundle.packs[0];

  howManyCoreSet = 666;
  coreSet.howMany.subscribe((value: number) => {
    howManyCoreSet = value;
  });
});

it('has access to any available bundle', () => {
  expect(ahtcgBundle.title).toEqual('Arkham Horror: The Card Game');
});

it('has access to any available cards pack in bundle', () => {
  expect(coreSet.name).toEqual('Core Set');
});

it('has access to how many packs in collection', () => {
  expect(howManyCoreSet).toEqual(0);
});

it('may adds a cards pack to its collection', () => {
  coreSet.addPackToCollection();

  expect(howManyCoreSet!).toEqual(1);
});

it('may adds cards pack to its collection multiple times', () => {
  coreSet.addPackToCollection();

  coreSet.addPackToCollection();

  expect(howManyCoreSet!).toEqual(2);
});

it('may removes a cards pack from its collection', () => {
  coreSet.addPackToCollection();

  coreSet.removePackFromCollection();

  expect(howManyCoreSet!).toEqual(0);
});

it('may removes a cards pack, even if not in its collection', () => {
  coreSet.removePackFromCollection();

  expect(howManyCoreSet!).toEqual(0);
});
