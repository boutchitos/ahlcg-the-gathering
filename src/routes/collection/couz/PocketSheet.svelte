<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  export let pockets: Pocket[];

  const shouldRotate = (pocket: Pocket) => {
    return pocket.cards[0].type_code === 'investigator';
  };
</script>

<div class="mx-auto flex">
  <div class="grid grid-cols-3 grid-rows-3 gap-2 bg-gray-700 p-2">
    {#each pockets as pocket}
      <div class="h-[209px] w-[150px] {shouldRotate(pocket) ? '-rotate-90 inline-flex justify-center items-center' : ''}">
        <img
          class="{shouldRotate(pocket) ? 'min-h-[150px] min-w-[209px]' : ''}
     rounded-md border-2 border-gray-300"
          src={`https://arkhamdb.com${pocket.cards[0].imagesrc}`}
          alt={pocket.cards[0].name}
        />
      </div>
    {/each}
  </div>
</div>
