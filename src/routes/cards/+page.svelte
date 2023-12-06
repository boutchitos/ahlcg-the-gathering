<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

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
</script>

<h1>Arkham Horror LCG : The Gathering</h1>

<p>{data.cards.length} investigator cards available</p>

<ul>
  {#each data.cards as card}
    <li>
      {getDisplayName(card)}
    </li>
  {/each}
</ul>
