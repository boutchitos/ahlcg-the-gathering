// Un regroupement de ce qu'on trouve sur FFG et sur arkhamdb.com.
// ahdb a plus d'historique (heureusement).
export const allAvailableBundles = [
  {
    title: 'Arkham Horror: The Card Game',
    packs: ['Core Set', 'Revised Core Set', 'Return to the Night of the Zealot'],
  },
  {
    title: 'The Dunwich Legacy',
    packs: [
      'The Dunwich Legacy Investigator Expansion',
      'The Dunwich Legacy Campaign Expansion',
      'Return to the Dunwich Legacy',
      'The Dunwich Legacy',
      'The Miskatonic Museum',
      'The Essex County Express',
      'Blood on the Altar',
      'Undimensioned and Unseen',
      'Where Doom Awaits',
      'Lost in Time and Space',
    ],
  },
  {
    title: 'The Path to Carcosa',
    packs: [
      'The Path to Carcosa Investigator Expansion',
      'The Path to Carcosa Campaign Expansion',
      'Return to the Path to Carcosa',
      'The Path to Carcosa',
      'Echoes of the Past',
      'The Unspeakable Oath',
      'A Phantom of Truth',
      'The Pallid Mask',
      'Black Stars Rise',
      'Dim Carcosa',
    ],
  },
  {
    title: 'The Forgotten Age',
    packs: [
      'The Forgotten Age Investigator Expansion',
      'The Forgotten Age Campaign Expansion',
      'Return to the Forgotten Age',
      'The Forgotten Age',
      'Threads of Fate',
      'The Boundary Beyond',
      'Heart of the Elders',
      'The City of Archives',
      'The Depths of Yoth',
      'Shattered Aeons',
    ],
  },
  {
    title: 'The Circle Undone',
    packs: [
      'The Circle Undone Investigator Expansion',
      'The Circle Undone Campaign Expansion',
      'Return to the Circle Undone',
      'The Circle Undone',
      'The Secret Name',
      'The Wages of Sin',
      'For the Greater Good',
      'Union and Disillusion',
      'In the Clutches of Chaos',
      'Before the Black Throne',
    ],
  },
  {
    title: 'The Dream-Eaters',
    packs: [
      'The Dream-Eaters',
      'The Search for Kadath',
      'A Thousand Shapes of Horror',
      'Dark Side of the Moon',
      'Point of No Return',
      'Where the Gods Dwell',
      'Weaver of the Cosmos',
    ],
  },
  {
    title: 'The Innsmouth Conspiracy',
    packs: [
      'The Innsmouth Conspiracy',
      'In Too Deep',
      'Devil Reef',
      'Horror in High Gear',
      'A Light in the Fog',
      'The Lair of Dagon',
      'Into the Maelstrom',
    ],
  },
  {
    title: 'Edge of the Earth',
    packs: ['Edge of the Earth Investigator Expansion', 'Edge of the Earth Campaign Expansion'],
  },
  {
    title: 'The Scarlet Keys',
    packs: ['The Scarlet Keys Campaign Expansion', 'The Scarlet Keys Investigator Expansion'],
  },
  {
    title: 'The Feast of Hemlock Vale',
    packs: [
      'The Feast of Hemlock Vale Investigator Expansion',
      'The Feast of Hemlock Vale Campaign Expansion',
    ],
  },
  {
    title: 'Investigator Starter Decks',
    packs: [
      'Harvey Walters',
      'Jacqueline Fine',
      'Nathaniel Cho',
      'Stella Clark',
      'Winifred Habbamock',
    ],
  },
  {
    title: 'Parallel investigators',
    packs: [
      'All or Nothing',
      'Bad Blood',
      'By the Book',
      'Laid to Rest',
      'On the Road Again',
      'Path of the Righteous',
      'Read or Die',
      'Red Tide Rising',
      'Relics of the Past',
    ],
  },
  {
    title: 'Standalone Adventures',
    packs: [
      // 'Barkham Horror: The Meddling of Meowlathotep', no ahdb
      'Carnevale of Horrors',
      'Curse of the Rougarou',
      'Fortune and Folly',
      'Guardians of the Abyss',
      'Machinations Through Time',
      'Murder at the Excelsior Hotel',
      'The Blob That Ate Everything',
      'The Blob That Ate Everything ELSE!',
      'The Labyrinths of Lunacy',
      'War of the Outer Gods',
    ],
  },
  {
    title: 'Promotional',
    packs: [
      'Hour of the Huntress',
      'The Dirge of Reason',
      'Ire of the Void',
      'The Deep Gate',
      'To Fight the Black Wind',
      'Blood of Baalshandor',
      'Dark Revelations',
    ],
  },
];

export const allAvailablePacks = allAvailableBundles.map((bundle) => bundle.packs).flat();
