<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  type Card = {
    name: string;
    pack_code: string;
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

<h1>{data.username}'s Investigator Cards Collection</h1>

<p>You own {data.packsCollection.length} packs</p>
<ul>
  {#each data.packsCollection as pack}
    <li>
      {pack.nbCopies ?? 1}x {pack.name}
    </li>
  {/each}
</ul>

<p>You own {data.investigatorCardsCollection.length} investigator cards</p>
<ul>
  {#each data.investigatorCardsCollection as card}
    <li>
      <a href={card.url} target="_blank">{getDisplayName(card)}</a>
    </li>
  {/each}
</ul>
