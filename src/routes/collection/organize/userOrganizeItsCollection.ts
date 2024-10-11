import { writable, type Writable } from 'svelte/store';

import {
  GroupPlayerCardsDirectives,
  type GroupByTitle,
} from '$gathering/CollectionOrganizer/group-cards-in-pockets/grouper-config';
import { SortPlayerCardsDirectives } from '$gathering/CollectionOrganizer/sort-player-cards';
import type { PlayerCardsSorter, AssetSlot, PlayerCardtype } from '$gathering/ICollectionOrganizer';

type OrganizingDirectivesDTO = {
  assetsSlots: string[];
  playerCardTypes: string[];
  sortingOrder: string[];
  groupByTitle: string;
  groupBondedCards: boolean;
  groupInvestigatorCards: boolean;
};

export function userBrowsesItsCollection(organizingDirectivesDTO: OrganizingDirectivesDTO): {
  playerCardTypes: Writable<PlayerCardtype[]>;
  slots: Writable<AssetSlot[]>;
  sortingOrder: Writable<PlayerCardsSorter[]>;
  groupByTitle: Writable<GroupByTitle>;
  groupBondedCards: Writable<boolean>;
  groupInvestigatorCards: Writable<boolean>;
} {
  const { groupingDirectives, sortingDirectives } =
    createOrganizingDirectives(organizingDirectivesDTO);

  const slots = writable(sortingDirectives.assetsBySlotsOrder);
  slots.subscribe((value) => {
    sortingDirectives.assetsBySlotsOrder = value;
    organizingDirectivesDTO.assetsSlots = sortingDirectives.assetsBySlotsOrder;
  });

  const playerCardTypes = writable(sortingDirectives.byPlayerCardTypesOrder);
  playerCardTypes.subscribe((value) => {
    sortingDirectives.byPlayerCardTypesOrder = value;
    organizingDirectivesDTO.playerCardTypes = sortingDirectives.byPlayerCardTypesOrder;
  });

  // Hack pour garder 'by-classes qui est très utilisé dans les tests, car ça ordonne la colleciton au complet avec ça.
  // Je veux juste l'enlever de la vue pour l'instant. C'est pas grave si la collection est triée par classes.
  // On extrait des binders par classe pour l'instant.
  const sortingOrder = writable(
    sortingDirectives.sortingOrder.toSpliced(
      sortingDirectives.sortingOrder.indexOf('by-classes'),
      1,
    ),
  );
  sortingOrder.subscribe((value) => {
    organizingDirectivesDTO.sortingOrder = sortingDirectives.sortingOrder;
    sortingDirectives.sortingOrder = ['by-classes', ...value];
  });

  const groupByTitle = writable(groupingDirectives.groupByTitle);
  groupByTitle.subscribe((value) => {
    groupingDirectives.groupByTitle = value;
    organizingDirectivesDTO.groupByTitle = groupingDirectives.groupByTitle;
  });

  const groupBondedCards = writable(groupingDirectives.groupBondedCards);
  groupBondedCards.subscribe((value) => {
    groupingDirectives.groupBondedCards = value;
    organizingDirectivesDTO.groupBondedCards = groupingDirectives.groupBondedCards;
  });

  const groupInvestigatorCards = writable(groupingDirectives.groupInvestigatorCards);
  groupInvestigatorCards.subscribe((value) => {
    groupingDirectives.groupInvestigatorCards = value;
    organizingDirectivesDTO.groupInvestigatorCards = groupingDirectives.groupInvestigatorCards;
  });

  return {
    playerCardTypes,
    slots,
    sortingOrder,
    groupByTitle,
    groupBondedCards,
    groupInvestigatorCards,
  };
}

function createOrganizingDirectives(organizingDirectivesDTO: OrganizingDirectivesDTO) {
  const sortingDirectives = new SortPlayerCardsDirectives();
  sortingDirectives.assetsBySlotsOrder = organizingDirectivesDTO.assetsSlots as AssetSlot[];
  sortingDirectives.byPlayerCardTypesOrder =
    organizingDirectivesDTO.playerCardTypes as PlayerCardtype[];
  sortingDirectives.sortingOrder = organizingDirectivesDTO.sortingOrder as PlayerCardsSorter[];

  const groupingDirectives = new GroupPlayerCardsDirectives();
  groupingDirectives.groupBondedCards = organizingDirectivesDTO.groupBondedCards;
  groupingDirectives.groupByTitle = organizingDirectivesDTO.groupByTitle as GroupByTitle;
  groupingDirectives.groupInvestigatorCards = organizingDirectivesDTO.groupInvestigatorCards;

  return { groupingDirectives, sortingDirectives };
}
