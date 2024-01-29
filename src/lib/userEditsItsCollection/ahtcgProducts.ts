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
      'Winifred Habbamock',
      'Nathaniel Cho',
      'Harvey Walters',
      'Jacqueline Fine',
      'Stella Clark',
    ],
  },
  {
    title: 'Parallel investigators',
    packs: [
      'Read or Die',
      'All or Nothing',
      'Bad Blood',
      'By the Book',
      'Red Tide Rising',
      'Relics of the Past',
      'On the Road Again',
      'Laid to Rest',
      'Path of the Righteous',
    ],
  },
  {
    title: 'Standalone Adventures',
    packs: [
      'Curse of the Rougarou',
      'Carnevale of Horrors',
      'The Labyrinths of Lunacy',
      'Guardians of the Abyss',
      'Murder at the Excelsior Hotel',
      // 'Barkham Horror: The Meddling of Meowlathotep', no ahdb
      'The Blob That Ate Everything',
      'War of the Outer Gods',
      'Machinations Through Time',
      'Fortune and Folly',
    ],
  },
];

export const allAvailablePacks = allAvailableBundles.map((bundle) => bundle.packs).flat();

// Not in the views: Promo
// Not in the views: Hour of the Huntress
// Not in the views: Books
// Not in the views: Ire of the Void
// Not in the views: The Dirge of Reason
// Not in the views: To Fight the Black Wind
// Not in the views: The Deep Gate
// Not in the views: Read or Die
// Not in the views: Blood of Baalshandor
// Not in the views: All or Nothing
// Not in the views: Dark Revelations
// Not in the views: Bad Blood
// Not in the views: By the Book
// Not in the views: Red Tide Rising
// Not in the views: On the Road Again
// Not in the views: The Blob That Ate Everything ELSE!
// Not in the views: Laid to Rest
// Not in the views: Path of the Righteous
// Not in the views: Relics of the Past
// Not in the ahdb: The Circle Undone Campaign Expansion
// Not in the ahdb: The Circle Undone Investigator Expansion
// Not in the ahdb: The Dunwich Legacy Campaign Expansion
// Not in the ahdb: The Dunwich Legacy Investigator Expansion
// Not in the ahdb: The Forgotten Age Campaign Expansion
// Not in the ahdb: The Forgotten Age Investigator Expansion
// Not in the ahdb: The Path to Carcosa Campaign Expansion
// Not in the ahdb: The Path to Carcosa Investigator Expansion