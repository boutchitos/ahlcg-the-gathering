import type { Card } from '$gathering/IBinderOutput';
import type { SLOT } from '$gathering/ICollectionOrganizer';
import type { ICardsSorter } from '.';

export class SortAssetBySlots implements ICardsSorter {
  constructor(private slots: SLOT[]) {}

  sortCards(a: Card, b: Card): number {
    return sortAssetBySlot(a, b, this.slots);
  }
}

function sortAssetBySlot(a: Card, b: Card, slots: SLOT[]) {
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
