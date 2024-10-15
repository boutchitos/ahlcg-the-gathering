<script lang="ts">
  import { page } from '$app/stores';

  import { isPlayerCardClasses, type PlayerCardClass } from '$gathering/PlayerCardClass';
  import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';

  import { userBrowsesItsBinder } from './userBrowsesItsBinder';
  import Binder from './Binder.svelte';

  function toClass(slug: string): PlayerCardClass | null {
    if (isPlayerCardClasses(slug)) {
      return slug;
    }
    return null;
  }

  $: playerCardClass = toClass($page.params.slug);
  $: binder = userBrowsesItsBinder(playerCardClass, new SortPlayerCardsDirectivesConfig());
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder {binder} />
