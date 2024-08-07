import { expect, it } from 'vitest';
import { captor, mockClear } from 'vitest-mock-extended';

import type { Binder } from '$gathering/IBinderOutput';
import type { PlayerCardClass } from '$gathering/ICollectionOrganizer';
import { indexOfPocketWithCard } from './test-utils/pockets';
import { setupOrganizer } from './test-utils/setupOrganizer';

it('organize multi-class cards as a class', () => {
  const { binderOutput, organizer } = setupOrganizer('The Secret Name');
  mockClear(binderOutput);

  // 'Enchanted Blade' is guardian/mystic. We order multi classes first,
  //then guardian / mystic last. https://arkhamdb.com/card/05118
  const multiFirst: PlayerCardClass[] = [
    'multi',
    'rogue',
    'seeker',
    'survivor',
    'multi',
    'neutral',
    'guardian',
    'mystic',
    'basic weakness',
  ];
  organizer.reorderByClasses(multiFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const indexMultiClass = indexOfPocketWithCard(binder.value.pockets, {
    name: 'Enchanted Blade',
    code: '05118',
  });
  const indexGuardian = indexOfPocketWithCard(binder.value.pockets, 'Something Worth Fighting For');
  expect(indexMultiClass).toBeLessThan(indexGuardian);
});
