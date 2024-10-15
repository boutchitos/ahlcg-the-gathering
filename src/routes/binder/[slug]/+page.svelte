<script lang="ts">
  import Binder from './Binder.svelte';

  export let data;
</script>

<h1 class="mb-4 text-center text-4xl font-bold">Couz's Investigator Cards Collection</h1>

<Binder binder={data.binder} />
