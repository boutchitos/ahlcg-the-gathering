import type { Card, ICardsSorter } from './ICardsSorter';

export enum AssetSlots {
  'Accessory',
  'Ally. Arcane',
  'Ally',
  'Arcane x2',
  'Arcane',
  'Body. Arcane',
  'Body. Hand x2',
  'Body',
  'Hand x2. Arcane',
  'Hand x2',
  'Hand. Arcane',
  'Hand',
  'Tarot',
  '-no-slot-',
}

export type SLOT = keyof typeof AssetSlots;
export const DEFAULT_ASSET_SLOTS_ORDER = Object.keys(AssetSlots).filter((v) =>
  isNaN(Number(v)),
) as SLOT[];

export function fixAssetsBySlots(wannaBe: string[]): SLOT[] {
  const incoming = new Set(
    wannaBe.filter((slot) => DEFAULT_ASSET_SLOTS_ORDER.includes(slot as SLOT)),
  );
  if (incoming.size !== DEFAULT_ASSET_SLOTS_ORDER.length) {
    return DEFAULT_ASSET_SLOTS_ORDER;
  }
  return wannaBe as SLOT[];
}

export class SortAssetsBySlots implements ICardsSorter {
  constructor(private slots: SLOT[]) {}

  sortCards(a: Card, b: Card): number {
    return sortAssetsBySlot(a, b, this.slots);
  }
}

function sortAssetsBySlot(a: Card, b: Card, slots: SLOT[]) {
  if (a.type_code !== 'asset' && b.type_code !== 'asset') {
    return 0;
  }
  if (a.type_code === 'asset' && b.type_code !== 'asset') {
    return -1;
  }
  if (a.type_code !== 'asset' && b.type_code === 'asset') {
    return 1;
  }

  // handheld will be a config, not yet, but this is for me.
  // // I should inject predicate. So, I would find by them. This will be finaly solution when I have
  // // configs for everything...
  // const aHandheld = a.slot?.includes('Hand');
  // const bHandheld = b.slot?.includes('Hand');
  // if (aHandheld === true && bHandheld !== true) return -1;
  // if (aHandheld !== true && bHandheld === true) return 1;
  // if (aHandheld === true && bHandheld === true) return 0;

  const aSlot = slots.indexOf(toSlot(a));
  if (aSlot === -1) {
    throw new Error(`unknown slot ${a.slot}`);
  }

  const bSlot = slots.indexOf(toSlot(b));
  if (bSlot === -1) {
    throw new Error(`unknown slot ${b.slot}`);
  }

  return aSlot - bSlot;
}

function toSlot(card: Card): SLOT {
  return card.slot as SLOT;
}
