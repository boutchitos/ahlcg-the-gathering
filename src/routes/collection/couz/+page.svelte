<script lang="ts">
  import type { PageData } from './$types';
  import type { Card } from '$lib/BinderStorage';
  import PocketSheet from './PocketSheet.svelte';
  export let data: PageData;

  let pocketOffset = 0;

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

  function previousPage() {
    pocketOffset -= 18;
    pocketOffset = pocketOffset < 0 ? 0 : pocketOffset;

    console.log(`click ${pocketOffset}`);
  }
  function nextPage() {
    pocketOffset += 18;
    console.log(`click ${pocketOffset}`);
  }
</script>

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<!-- un binder, list of PocketSheet/ front-back avec un pager-->
<div class="mx-auto flex justify-center">
  <div class="grid grid-cols-2 gap-2">
    <button on:click={previousPage}>
      <PocketSheet pockets={data.pockets.slice(pocketOffset, pocketOffset + 9)} />
    </button>
    <button on:click={nextPage}>
      <PocketSheet pockets={data.pockets.slice(pocketOffset + 9, pocketOffset + 9 + 9)} />
    </button>
  </div>
</div>

<!-- <p>You own {data.investigatorCardsCollection.length} investigator cards</p>
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
{/each} -->
