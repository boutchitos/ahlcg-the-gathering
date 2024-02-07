import type { Card, ICardsSorter } from './ICardsSorter';
import type { CLASS, PLAYER_CARD_TYPE, SLOT } from './sorter-config';
import { sortByClasses, sortAssetsBySlots, sortByPlayerCardTypes } from './sorters';

export type SortOptions = {
  classes: CLASS[];
  assetSlots: SLOT[];
  playerCardTypes: PLAYER_CARD_TYPE[];
};

export function sortPlayerCards(
  cards: Iterable<Card>,
  { classes, playerCardTypes, assetSlots }: SortOptions,
): Card[] {
  const byClasses = sortByClasses(classes);
  const assetBySlots = sortAssetsBySlots(assetSlots);
  const byPlayerCardTypes = sortByPlayerCardTypes(playerCardTypes);
  const cardsSorters = [byClasses, byPlayerCardTypes, assetBySlots];

  return [...cards].sort((a, b) => sortCardsAsUserWant(a, b, cardsSorters));
}

// Je pourrais procéder par exception pour sortir de l'algo. dès que je sais le tri.
function sortCardsAsUserWant(a: Card, b: Card, sorters: ICardsSorter[]) {
  const byWeakness = sortPlayerCardsByWeakness(a, b);
  if (byWeakness !== 0) return byWeakness;

  // I would put locations here after weakness, probably
  // investigator cards that are catched up by pocket regrouping.
  // yup for now : Luke Robinson
  const bylocations = sortPlayerCardsByLocation(a, b);
  if (bylocations !== 0) return bylocations;

  if (!isWeaknessCard(a) && !isLocationCard(a)) {
    const one = sorters[0].sortCards(a, b);
    if (one !== 0) return one;

    const two = sorters[1].sortCards(a, b);
    if (two !== 0) return two;

    const three = sorters[2].sortCards(a, b);
    if (three !== 0) return three;
  }

  const name_sort = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
  if (name_sort !== 0) return name_sort;

  const xp_sort = a.xp - b.xp;
  if (xp_sort !== 0) return xp_sort;

  return 0;
}

function sortPlayerCardsByLocation(a: Card, b: Card): number {
  const aIsLocation = isLocationCard(a);
  const bIsLocation = isLocationCard(b);

  if (aIsLocation !== bIsLocation) {
    return aIsLocation ? 1 : -1; // location at the end
  }

  return 0;
}

function sortPlayerCardsByWeakness(a: Card, b: Card): number {
  const aIsWeakness = isWeaknessCard(a);
  const bIsWeakness = isWeaknessCard(b);

  if (aIsWeakness !== bIsWeakness) {
    return aIsWeakness ? 1 : -1; // weakness at the end
  }

  return 0;
}

function isLocationCard(card: Card) {
  return card.type_code === 'location';
}

function isWeaknessCard(card: Card) {
  const enemy = card.type_code === 'enemy';
  const weakness = card.subtype_code?.includes('weakness');
  return enemy || weakness;
}
