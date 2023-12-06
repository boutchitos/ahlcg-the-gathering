import ahdbPacks from '$lib/server/ahdb.packs.json';
import packsCollection from '$lib/collections/couz.json';
import type { PageServerLoad } from './$types';

type CollectionPack = {
  investigatorExpansionOnly?: boolean;
  nbCopies?: number;
  packCode: string;
};

type Pack = {
  name: string;
  code: string;
  position: number;
  cycle_position: number;
  available: string;
  known: number;
  total: number;
  url: string;
  id: number;
};

function getPacksByCode(ahdbPacks: Pack[]) {
  const packsByCode = new Map<string, Pack>();
  for (const pack of ahdbPacks) {
    if (packsByCode.has(pack.code)) {
      throw new Error('pack already there');
    }
    packsByCode.set(pack.code, pack);
  }
  return packsByCode;
}

const packsByCode: Map<string, Pack> = getPacksByCode(ahdbPacks);

export const load: PageServerLoad = () => {
  return {
    username: 'Couz',
    packsCollection: packsCollection.map((collPack: CollectionPack) =>
      Object.assign({}, packsByCode.get(collPack.packCode), collPack),
    ),
  };
};
