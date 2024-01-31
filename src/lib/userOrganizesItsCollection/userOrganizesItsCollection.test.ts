import { expect, it } from 'vitest';
import { userOrganizesItsCollection } from './userOrganizesItsCollection';

it('has access to its actual classes', () => {
  const { classes } = userOrganizesItsCollection();

  let initially: string[];
  classes.subscribe((value) => {
    initially = value;
  });

  expect(initially!).toEqual(['guardian', 'mystic', 'rogue', 'seeker', 'survivor', 'neutral']);
});

it('could reorder classes', () => {
  const { classes } = userOrganizesItsCollection();

  let updated: string[];
  classes.subscribe((value) => {
    updated = value;
  });

  classes.set(['mystic', 'rogue', 'seeker', 'survivor', 'neutral']);

  // extremely harmful, but yeah! we could do that, and don't expect it to work.
  expect(updated!).toEqual(['mystic', 'rogue', 'seeker', 'survivor', 'neutral']);
});
