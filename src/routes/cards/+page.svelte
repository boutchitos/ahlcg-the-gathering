<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  type Card = {
    name: string;
    subname: string;
    url: string;
    xp: number;
  };

  const getDisplayName = (card: Card) => {
    const subname = card.subname ? `: ${card.subname}` : '';
    const xp = card.xp ? ` (${card.xp} xp)` : '';
    return `${card.name}${subname}${xp}`;
  };
</script>

<p>{data.cards.length} investigator cards available</p>

<ul>
  {#each data.cards as card}
    <li>
      <a href={card.url} target="_blank">{getDisplayName(card)}</a>
    </li>
  {/each}
</ul>
