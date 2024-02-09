import { AssetSlots, type AssetSlot } from './AssetSlot';
import type { Card, ICardsSorter } from './ICardsSorter';

export const DEFAULT_ASSET_SLOTS_ORDER = Object.keys(AssetSlots).filter((v) =>
  isNaN(Number(v)),
) as AssetSlot[];

export function fixAssetsBySlotsOrder(wannaBe: string[]): AssetSlot[] {
  const incoming = new Set(
    wannaBe.filter((slot) => DEFAULT_ASSET_SLOTS_ORDER.includes(slot as AssetSlot)),
  );
  if (incoming.size !== DEFAULT_ASSET_SLOTS_ORDER.length) {
    return DEFAULT_ASSET_SLOTS_ORDER;
  }
  return wannaBe as AssetSlot[];
}

export class SortAssetsBySlots implements ICardsSorter {
  constructor(private slots: AssetSlot[]) {}

  sortCards(a: Card, b: Card): number {
    return sortAssetsBySlot(a, b, this.slots);
  }
}

function sortAssetsBySlot(a: Card, b: Card, slots: AssetSlot[]) {
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

function toSlot(card: Card): AssetSlot {
  return (card.slot as AssetSlot) ?? '-no-slot-';
}
