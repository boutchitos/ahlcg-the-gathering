<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
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
