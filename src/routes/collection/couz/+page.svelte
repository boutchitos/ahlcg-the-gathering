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
    const slot = card.type_code === 'asset' && card.slot ? `-- ${card.slot}` : '';
    return `${card.faction_code} -- ${card.type_code}${slot}  -- ${card.name}${subname}${xp}`;
  };

  const sortCardsAsUserWant = (a: Card, b: Card) => {
    const faction_sort = a.faction_code.localeCompare(b.faction_code);
    if (faction_sort !== 0) return faction_sort;

    const typeCodeOrder = [
      'investigator',
      'asset',
      'event',
      'skill',
      'story',
      'enemy',
      'treachery',
    ]; // story, enemy???
    const aTypeCode = typeCodeOrder.indexOf(a.type_code);
    const bTypeCode = typeCodeOrder.indexOf(b.type_code);
    if (aTypeCode === -1) {
      throw new Error(`unknown type code ${a.type_code}`);
    }
    if (bTypeCode === -1) {
      throw new Error(`unknown type code ${b.type_code}`);
    }
    const type_code_sort = aTypeCode - bTypeCode;
    if (type_code_sort !== 0) return type_code_sort;

    const slot_sort = (a.slot ?? '').localeCompare(b.slot ?? '');
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
