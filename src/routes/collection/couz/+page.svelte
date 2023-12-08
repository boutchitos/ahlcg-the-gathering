<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>{data.username}'s Investigator Cards Collection</h1>

<p>You own {data.packsCollection.length} packs</p>
<ul>
  {#each data.packsCollection as pack}
    <li>
      {pack.nbCopies}x {pack.name}
    </li>
  {/each}
</ul>

<p>You own {data.investigatorCardsCollection.length} investigator cards</p>
{#each data.pockets as pocket}
  <ul>
    {#each pocket.cards as card}
      <li>
        <a href={card.url} target="_blank">{card.displayName}</a>
      </li>
    {/each}
  </ul>
  <hr />
{/each}
