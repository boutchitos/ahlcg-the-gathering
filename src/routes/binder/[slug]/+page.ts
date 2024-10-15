import { isPlayerCardClasses, type PlayerCardClass } from '$gathering/PlayerCardClass';
import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';
import { userBrowsesItsBinder } from './userBrowsesItsBinder';
import type { PageLoad } from './$types';

function toClass(slug: string): PlayerCardClass | null {
  if (isPlayerCardClasses(slug)) {
    return slug;
  }
  return null;
}

export const load: PageLoad = ({ params }) => {
  const playerCardClass = toClass(params.slug);
  const { binder } = userBrowsesItsBinder(playerCardClass, new SortPlayerCardsDirectivesConfig());

  return { binder };
};
