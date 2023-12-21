<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  export let pockets: Pocket[];
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-3 gap-4">
    {#each pockets.slice(0, 9) as pocket}
      <div class="h-[210px] w-[150px] border">
        <img src={`https://arkhamdb.com${pocket.cards[0].imagesrc}`} alt={pocket.cards[0].name} />
      </div>
    {/each}
  </div>
</div>
