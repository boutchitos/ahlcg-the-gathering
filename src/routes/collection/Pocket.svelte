<script lang="ts">
  import type { PocketViewModel } from '$lib/userBrowsesItsCollection/userBrowsesItsCollection';

  export let pocket: PocketViewModel;

  function rotateLandscape(pocket: PocketViewModel): string {
    return pocket.coverImage.landscape ? '-rotate-90' : '';
  }

  function setMinWidthHeight(pocket: PocketViewModel): string {
    return pocket.coverImage.landscape ? 'min-h-[150px] min-w-[209px]' : '';
  }
</script>

<div class="inline-flex h-[209px] w-[150px] items-center justify-center">
  <img
    class="rounded-md border-2 border-gray-300 {setMinWidthHeight(pocket)} {rotateLandscape(
      pocket,
    )}"
    src={pocket.coverImage.url}
    alt={pocket.title}
  />
</div>
