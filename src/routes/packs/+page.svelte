<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  type Pack = {
    available: string;
    name: string;
    url: string;
  };

  const getDisplayName = (pack: Pack) => {
    return `${pack.name}`;
  };

  const sortPacks = (packs: Pack[]) => {
    const byDateAvailable = (a: Pack, b: Pack) =>
      a.available < b.available ? -1 : a.available === b.available ? 0 : 1;
    return packs.sort(byDateAvailable);
  };
</script>

<p>{data.packs.length} investigator packs available</p>

<ul>
  {#each sortPacks(data.packs) as pack}
    <li>
      <a href="{pack.url}/list/player" target="_blank">{getDisplayName(pack)}</a>
    </li>
  {/each}
</ul>
