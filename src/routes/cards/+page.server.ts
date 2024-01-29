import ahdbCards from '$lib/userBrowsesItsCollection/ahdb.cards.json';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const csr = false;

export const load: PageServerLoad = () => {
  const toRemove = ['Random Basic Weakness'];
  return {
    cards: ahdbCards.filter((card) => !toRemove.includes(card.name)),
  };
};
