<script lang="ts">
  import type { Pocket } from '$lib/BinderStorage';

  export let pockets: Pocket[];
</script>

<div class="grid grid-cols-3 grid-rows-3">
  {#each pockets.slice(0,9) as pocket}
      <p>{pocket.cards[0].name}</p>
  {/each}
</div>
