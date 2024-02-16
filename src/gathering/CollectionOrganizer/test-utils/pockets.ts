import type { Pocket } from '$gathering/IBinderOutput';

export function findPocketWithCard(pockets: Pocket[], name: string) {
  return pockets.find((pocket) => pocket.cards.map((c) => c.name).includes(name));
}
type IndexByName = string;
type IndexByCode = { name: string; code: string }; // we force name for debugabillity

export function indexOfPocketWithCard(pockets: Pocket[], name: IndexByName): number;
export function indexOfPocketWithCard(pockets: Pocket[], { code }: IndexByCode): number;
export function indexOfPocketWithCard(pockets: Pocket[], arg: IndexByName | IndexByCode): number {
  if (typeof arg === 'string') {
    const name = arg;
    return pockets.findIndex((pocket) => pocket.cards.map((c) => c.name).includes(name));
  }
  return pockets.findIndex((pocket) => pocket.cards.map((c) => c.code).includes(arg.code));
}
