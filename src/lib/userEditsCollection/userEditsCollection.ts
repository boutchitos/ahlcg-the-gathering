import { readonly, writable } from 'svelte/store';

export function useCollectionEditor() {
  const packs = writable(['Core Set', 'Revised Core Set']);
  return { packsStore: readonly(packs) };
}
