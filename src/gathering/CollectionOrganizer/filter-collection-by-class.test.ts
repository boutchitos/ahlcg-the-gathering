import { expect, it } from 'vitest';
import { captor, mockClear } from 'vitest-mock-extended';

import type { Binder } from '$gathering/IBinderOutput';

import { findPocketWithCard } from './test-utils/pockets';
import { setupOrganizer } from './test-utils/setupOrganizer';

it('filters a collection with a class', () => {
  const binder = captor<Binder>();
  const { binderOutput, organizer } = setupOrganizer('Core Set');
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  expect(findPocketWithCard(binder.value.pockets, 'Agnes Baker')).toBeDefined();
  mockClear(binderOutput);

  organizer.filterByClass('guardian');
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);

  expect(findPocketWithCard(binder.value.pockets, 'Agnes Baker')).toBeUndefined();
});
