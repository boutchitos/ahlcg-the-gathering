<script lang="ts">
  import ahdbCards from '$lib/ahdb.cards.json';

  const uiSubname = (subname: string | undefined) => {
    return subname ?? false ? ` - (${subname})` : '';
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
  {#each cards as { name, real_name, subname }}
    <li>
      {name}
      {uiSubname(subname)}{name !== real_name ? '=== REAL NAME DIFF. ===============' : ''}
    </li>
  {/each}
</ul>
