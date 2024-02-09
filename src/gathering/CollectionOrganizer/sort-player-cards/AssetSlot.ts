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

export type AssetSlot = keyof typeof AssetSlots;