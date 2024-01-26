<script lang="ts">
  import type { PageData } from './$types';

  import { useBinder } from '$lib/userBrowsesItsCollection/BinderOutputPort';
  import Binder from './Binder.svelte';

  export let data: PageData;

  const binder = useBinder(data.pockets);
</script>

<h1 class="text-4xl font-bold">{data.username}'s Investigator Cards Collection</h1>

<div class="mx-auto flex justify-center">
  <Binder {binder} />
</div>
