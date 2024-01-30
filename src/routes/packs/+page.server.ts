import ahdbPacks from '$gathering/PackRepository/ahdb.packs.json';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const csr = false;

export const load: PageServerLoad = () => {
  return {
    packs: ahdbPacks,
  };
};
