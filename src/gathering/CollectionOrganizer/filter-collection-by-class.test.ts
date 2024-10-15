import { expect, it } from 'vitest';
import { captor, mockClear } from 'vitest-mock-extended';

import type { Binder } from '$gathering/IBinderOutput';

import { findPocketWithCard } from './test-utils/pockets';
import { setupOrganizer } from './test-utils/setupOrganizer';

it('filters a collection with a class', () => {
  const { binderOutput, organizer } = setupOrganizer('Core Set');
  mockClear(binderOutput);

  organizer.filterByClass('guardian');

  const guardianBinder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(guardianBinder);

  expect(findPocketWithCard(guardianBinder.value.pockets, 'Agnes Baker')).toBeUndefined();
});
