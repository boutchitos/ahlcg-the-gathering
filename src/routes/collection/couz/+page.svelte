<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  type Card = {
    faction_code: string;
    name: string;
    pack_code: string;
    slot: string;
    subname: string;
    type_code: string;
    url: string;
    xp: number;
  };

  const getDisplayName = (card: Card) => {
    const subname = card.subname ? `: ${card.subname}` : '';
    const xp = card.xp ? ` (${card.xp} xp)` : '';
    return `${card.faction_code} -- ${card.type_code} -- ${card.slot} -- ${card.name}${subname}${xp}`;
  };

  const sortCardsAsUserWant = (a: Card, b: Card) => {
    const faction_sort = a.faction_code.localeCompare(b.faction_code);
    if (faction_sort !== 0) return faction_sort;

    const type_code_sort = a.type_code.localeCompare(b.type_code);
    if (type_code_sort !== 0) return type_code_sort;

    const slot_sort = (a.slot ?? 'no slot').localeCompare(b.slot ?? 'no slot');
    if (slot_sort !== 0) return slot_sort;

    const name_sort = a.name.localeCompare(b.name, undefined, { ignorePunctuation: true });
    if (name_sort !== 0) return name_sort;

    return 0;
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
  {#each data.investigatorCardsCollection.sort(sortCardsAsUserWant) as card}
    <li>
      <a href={card.url} target="_blank">{getDisplayName(card)}</a>
    </li>
  {/each}
</ul>
