<script lang="ts">
  import ahdbCards from '$lib/ahdb.cards.json';

  type Card = {
    name: string;
    subname: string;
    xp: number;
  };

  const getDisplayName = (card: Card) => {
    const subname = card.subname ? `: ${card.subname}` : '';
    const xp = card.xp ? ` (${card.xp} xp)` : '';
    return `${card.name}${subname}${xp}`;
  };

  const getCards = () => {
    const toRemove = ['Random Basic Weakness'];
    return ahdbCards.filter((card) => !toRemove.includes(card.name));
  };

  const cards = getCards();
</script>

<h1>Arkham Horror LCG : The Gathering</h1>

<p>You own {cards.length} cards!</p>

<ul>
  {#each cards as card}
    <li>
      {getDisplayName(card)}
    </li>
  {/each}
</ul>
