import type { IPackRepository } from '$gathering/IPackRepository';
import type { Pack } from '$gathering/Pack';

export function createPackRepository(): IPackRepository {
  return thePackRepository;
}

class PackRepository implements IPackRepository {
  getAllPacks(): Iterable<Pack> {
    return [
      'A Light in the Fog',
      'A Phantom of Truth',
      'A Thousand Shapes of Horror',
      'All or Nothing',
      'Bad Blood',
      // not in ahdb: 'Barkham Horror: The Meddling of Meowlathotep',
      'Before the Black Throne',
      'Black Stars Rise',
      'Blood of Baalshandor',
      'Blood on the Altar',
      'By the Book',
      'Carnevale of Horrors',
      'Core Set',
      'Curse of the Rougarou',
      'Dark Revelations',
      'Dark Side of the Moon',
      'Devil Reef',
      'Dim Carcosa',
      'Echoes of the Past',
      'Edge of the Earth Campaign Expansion',
      'Edge of the Earth Investigator Expansion',
      'For the Greater Good',
      'Fortune and Folly',
      'Guardians of the Abyss',
      'Harvey Walters',
      'Heart of the Elders',
      'Horror in High Gear',
      'Hour of the Huntress',
      'In the Clutches of Chaos',
      'In Too Deep',
      'Into the Maelstrom',
      'Ire of the Void',
      'Jacqueline Fine',
      'Laid to Rest',
      'Lost in Time and Space',
      'Machinations Through Time',
      'Murder at the Excelsior Hotel',
      'Nathaniel Cho',
      'On the Road Again',
      'Path of the Righteous',
      'Point of No Return',
      'Read or Die',
      'Red Tide Rising',
      'Relics of the Past',
      'Return to the Circle Undone',
      'Return to the Dunwich Legacy',
      'Return to the Forgotten Age',
      'Return to the Night of the Zealot',
      'Return to the Path to Carcosa',
      'Revised Core Set',
      'Shattered Aeons',
      'Stella Clark',
      'The Blob That Ate Everything',
      'The Boundary Beyond',
      'The Circle Undone Campaign Expansion',
      'The Circle Undone Investigator Expansion',
      'The Circle Undone',
      'The City of Archives',
      'The Deep Gate',
      'The Depths of Yoth',
      'The Dirge of Reason',
      'The Dream-Eaters',
      'The Dunwich Legacy Campaign Expansion',
      'The Dunwich Legacy Investigator Expansion',
      'The Dunwich Legacy',
      'The Essex County Express',
      'The Feast of Hemlock Vale Campaign Expansion',
      'The Feast of Hemlock Vale Investigator Expansion',
      'The Forgotten Age Campaign Expansion',
      'The Forgotten Age Investigator Expansion',
      'The Forgotten Age',
      'The Innsmouth Conspiracy',
      'The Labyrinths of Lunacy',
      'The Lair of Dagon',
      'The Miskatonic Museum',
      'The Pallid Mask',
      'The Path to Carcosa Campaign Expansion',
      'The Path to Carcosa Investigator Expansion',
      'The Path to Carcosa',
      'The Scarlet Keys Campaign Expansion',
      'The Scarlet Keys Investigator Expansion',
      'The Search for Kadath',
      'The Secret Name',
      'The Unspeakable Oath',
      'The Wages of Sin',
      'Threads of Fate',
      'To Fight the Black Wind',
      'Undimensioned and Unseen',
      'Union and Disillusion',
      'War of the Outer Gods',
      'Weaver of the Cosmos',
      'Where Doom Awaits',
      'Where the Gods Dwell',
      'Winifred Habbamock',
    ];
  }
}

// no need to get many instance of static data.
const thePackRepository = new PackRepository();
const thePacksInView = new Set(thePackRepository.getAllPacks());

import ahdbPacks from './ahdb.packs.json';

ahdbPacks.forEach(({ name }) => {
  if (!thePacksInView.has(name) && !['Books', 'Promo'].includes(name)) {
    console.log(`Not in the views: ${name}`);
  }
});

thePacksInView.forEach((packInView) => {
  const items = ahdbPacks.filter(({ name }) => packInView === name);
  const emulate =
    packInView.includes(' Campaign Expansion') || packInView.includes(' Investigator Expansion');
  if (items.length === 0 && !emulate) {
    console.log(`Not in the ahdb: ${packInView}`);
  }
});
