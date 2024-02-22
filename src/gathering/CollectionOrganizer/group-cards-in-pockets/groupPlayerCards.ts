import type { Card } from '$gathering/Card';
import type { Pocket, PocketCard } from '$gathering/IBinderOutput';
import type { GroupPlayerCardsDirectives } from './grouper-config';

export function groupCardsInPockets(
  cards: Card[],
  directives: GroupPlayerCardsDirectives,
): Pocket[] {
  const pocketsByInvestigator = new Map<string, Pocket>();
  const pocketsByTitle = new Map<string, Pocket>();
  const pocketsByBoundedCard = new Map<string, Pocket>();

  const bondedToCards: Card[] = [];
  const cardsWithRestrictions: Card[] = [];

  const regrouped = cards.reduce((pockets: Pocket[], card) => {
    let pocket: Pocket | undefined;

    const title = `${card.name}${directives.groupByTitle === 'group-by-title-same-level' ? card.xp : ''}`;

    if (directives.groupByTitle !== 'disabled' && pocketsByTitle.has(title)) {
      pocket = pocketsByTitle.get(title);
    } else if (directives.groupInvestigatorCards && card.restrictions !== undefined) {
      cardsWithRestrictions.push(card);
      return pockets;
    } else if (directives.groupBondedCards && card.bonded_to !== undefined) {
      bondedToCards.push(card);
      return pockets;
    }

    if (pocket === undefined) {
      pocket = { cards: [] };

      pocketsByTitle.set(title, pocket);

      if (card.type_code === 'investigator') {
        pocketsByInvestigator.set(card.code, pocket);
      }

      if (card.bonded_cards !== undefined) {
        card.bonded_cards.forEach((bondedCard) => {
          pocketsByBoundedCard.set(bondedCard.code, pocket!);
        });
      }

      pockets.push(pocket);
    }

    pocket!.cards.push(toPocketCard(card));

    return pockets;
  }, []);

  cardsWithRestrictions.forEach((card) => {
    for (const code of Object.keys(card.restrictions!.investigator)) {
      const pocket = pocketsByInvestigator.get(code);
      if (pocket !== undefined) {
        pocket.cards.push(toPocketCard(card));
        if (card.bonded_cards !== undefined) {
          card.bonded_cards.forEach((bondedCard) => {
            pocketsByBoundedCard.set(bondedCard.code, pocket!);
          });
        }
        break;
      }
    }
  });

  bondedToCards.forEach((card) => {
    const pocket = pocketsByBoundedCard.get(card.code);
    assert(pocket !== undefined, `we should have found a pocket for bonded card ${card.name}`);

    pocket!.cards.push(toPocketCard(card));
  });

  return regrouped;
}

function assert(expr: boolean, help = 'something went wrong!') {
  if (!expr) {
    throw new Error(help);
  }
}

function toPocketCard(card: Card): PocketCard {
  const { code, name, xp } = card;
  return {
    code,
    image: {
      landscape: card.type_code === 'investigator',
      url: `https://arkhamdb.com${card.imagesrc}`,
    },
    name,
    xp,
  };
}
