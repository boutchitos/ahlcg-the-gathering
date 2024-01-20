import { readonly, writable } from 'svelte/store';

type Pack = {
  howMany: number;
  name: string;
  owned: boolean;
  addPackToCollection: () => void;
  removePackFromCollection: () => void;
};

export function useCollectionEditor() {
  const packs = writable<Pack[]>([createPack('Core Set'), createPack('Revised Core Set')]);
  return {
    packsStore: readonly(packs),
  };
}

function createPack(name: string): Pack {
  return {
    howMany: 0,
    name,
    owned: false,
    addPackToCollection: () => {
      console.log(`${name} added to collection`);
    },
    removePackFromCollection: () => {
      console.log(`${name} removed from collection`);
    },
  };
}
