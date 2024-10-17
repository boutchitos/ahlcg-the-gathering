<script lang="ts">
  import { page } from '$app/stores';

  import { isPlayerCardClasses, type PlayerCardClass } from '$gathering/PlayerCardClass';
  import { SortPlayerCardsDirectivesConfig } from '$lib/SortPlayerCardsDirectivesConfig';

  import { userBrowsesItsBinder } from './userBrowsesItsBinder';
  import Binder from './Binder.svelte';

  function slugToClasses(slug: string): PlayerCardClass[] {
    if (isPlayerCardClasses(slug)) {
      return [slug];
    } else if (slug === 'the-binder-that-store-everything-else') {
      return ['multi', 'neutral', 'basic weakness'];
    }
    throw Error('unknown slug');
  }

  $: playerCardClasses = slugToClasses($page.params.slug);
  $: binder = userBrowsesItsBinder(playerCardClasses, new SortPlayerCardsDirectivesConfig());
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder {binder} />
