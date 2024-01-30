import { beforeEach, expect, it } from 'vitest';
import { createPackRepository } from '$gathering';
import { allAvailablePacks } from './ahtcgProducts';
import type { Pack } from '$gathering/Pack';

let gathering: Set<Pack>;
let presented: Set<Pack>;

beforeEach(() => {
  gathering = new Set([...createPackRepository().getAllPacks()]);
  presented = new Set([...allAvailablePacks]);
});

it('all gathering packs are presented or ignored', () => {
  const notPresented = [...gathering].filter((name) => !presented.has(name));

  // To fix this test, either present it in ahtcgProducts.ts; or ignore it here.
  // This is the list of packs in ArkhamDB that we choose to not present.
  const ignored = ['Promo', 'Books'];
  expect(new Set(notPresented)).toEqual(new Set(ignored));
});

it('all presented packs are offered by gathering', () => {
  const notOffered = [...presented].filter((name) => !gathering.has(name));

  // Not so much to do, probably not supported by ArkhamDB. Better not to
  // present it.
  expect(new Set(notOffered)).toEqual(new Set([]));
});
