import { expect, it } from 'vitest';
import { indexOfPocketWithCard, setup } from './test-utils';
import type { CLASS } from '$gathering/ICollectionOrganizer';
import { captor, mockClear } from 'vitest-mock-extended';
import type { Binder } from '$gathering/IBinderOutput';

it('organize multi-class cards as a class', () => {
  const { binderOutput, organizer } = setup('The Secret Name');
  mockClear(binderOutput);

  // 'Enchanted Blade' is guardian/mystic. We order multi classes first,
  //then guardian / mystic last. https://arkhamdb.com/card/05118
  const multiFirst: CLASS[] = [
    'multi',
    'rogue',
    'seeker',
    'survivor',
    'multi',
    'neutral',
    'guardian',
    'mystic',
  ];
  organizer.reorderClasses(multiFirst);

  const binder = captor<Binder>();
  expect(binderOutput.binderUpdated).toHaveBeenCalledWith(binder);
  const indexMultiClass = indexOfPocketWithCard(binder.value.pockets, {
    name: 'Enchanted Blade',
    code: '05118',
  });
  const indexGuardian = indexOfPocketWithCard(binder.value.pockets, 'Something Worth Fighting For');
  expect(indexMultiClass).toBeLessThan(indexGuardian);
});
