<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  export let pockets: Pocket[];
</script>

<div class="mx-auto flex justify-center">
  <div class="grid grid-cols-3 gap-2 bg-gray-700 p-2">
    {#each pockets as pocket}
      <img
        class="h-auto w-[150px] rounded-md border-2 border-gray-500"
        src={`https://arkhamdb.com${pocket.cards[0].imagesrc}`}
        alt={pocket.cards[0].name}
      />
    {/each}
  </div>
</div>
