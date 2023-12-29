<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  export let pockets: Pocket[];

  function minWidthHeight(pocket:Pocket): string {
    return shouldRotate(pocket) ? 'min-h-[150px] min-w-[209px]' : ''
  }

  function rotateInvestigators(pocket: Pocket): string {
    return shouldRotate(pocket) ? '-rotate-90' : '';
  }

  function shouldRotate(pocket: Pocket): boolean {
    return pocket.cards[0].type_code === 'investigator';
  };
</script>

<div class="mx-auto flex">
  <div class="grid grid-cols-3 grid-rows-3 gap-2 bg-gray-700 p-2">
    {#each pockets as pocket}
      <div
        class="inline-flex h-[209px] w-[150px] items-center justify-center {rotateInvestigators(
          pocket,
        )}"
      >
        <img
          class="{minWidthHeight(pocket)}
     rounded-md border-2 border-gray-300"
          src={`https://arkhamdb.com${pocket.cards[0].imagesrc}`}
          alt={pocket.cards[0].name}
        />
      </div>
    {/each}
  </div>
</div>
