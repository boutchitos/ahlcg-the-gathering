<script lang="ts">
  import type { PageData } from './$types';
  import type { Card } from '$lib/BinderStorage';
  import PocketSheet from './PocketSheet.svelte';
  export let data: PageData;

  const slot = (card: Card) => (card.type_code === 'asset' && card.slot ? ` -- ${card.slot}` : '');
  const title = (card: Card) => {
    const subname = card.subname ? `: ${card.subname}` : '';
    const level = card.xp ? ` (lvl ${card.xp})` : '';
    return `${card.name}${subname}${level}`;
  };

  const toInsert = (card: Card) => {
    // Investigator Expansion is emulated for Path to Carcosa.
    const packsToInsert = ['ptc', 'eotp', 'tuo', 'apot', 'tpm', 'bsr', 'dca'];
    return packsToInsert.includes(card.pack_code);
  };
</script>

<h1 class="text-2xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<p class="text-lg font-bold">You own {data.packsCollection.length} packs</p>
<ul>
  {#each data.packsCollection as pack}
    <li>
      {pack.nbCopies}x {pack.name}
    </li>
  {/each}
</ul>

<PocketSheet pockets={data.pockets} />

<p>You own {data.investigatorCardsCollection.length} investigator cards</p>
{#each data.pockets as pocket}
  <ul>
    {#each pocket.cards as card}
      {#if toInsert(card)}
        <li style="color: red">
          {card.quantity}x <a href={card.url} target="_blank">{title(card)}</a>
          ({card.faction_code} -- {card.type_code}{slot(card)} -- {card.pack_name})
        </li>
      {:else}
        <li>
          {card.quantity}x <a href={card.url} target="_blank">{title(card)}</a>
          ({card.faction_code} -- {card.type_code}{slot(card)} -- {card.pack_name})
        </li>
      {/if}
    {/each}
  </ul>
  <hr />
{/each}
