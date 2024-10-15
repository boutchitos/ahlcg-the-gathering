import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';
import { userBrowsesItsBinder } from './userBrowsesItsBinder';

export function load() {
  const { binder } = userBrowsesItsBinder(new SortPlayerCardsDirectivesConfig());

  return { binder };
}
