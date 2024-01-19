import { readonly, writable } from 'svelte/store';

type Pack = {
  howMany: number;
  name: string;
  owned: boolean;
};

export function useCollectionEditor() {
  const packs = writable<Pack[]>([
    { howMany: 1, name: 'Core Set', owned: true },
    { howMany: 0, name: 'Revised Core Set', owned: false },
  ]);
  return {
    packsStore: readonly(packs),
    addPack: (pack: Pack) => {
      console.log(`adding ${pack.name}`);
    },
    removePack: (pack: Pack) => {
      console.log(`removing ${pack.name}`);
    },
  };
}
