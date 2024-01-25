<script lang="ts">
  import './app.css';

  import { createCollectionLoader } from '$gathering';

  const isBrowser = typeof window !== 'undefined';

  const collection = isBrowser ? JSON.parse(localStorage.collection) : [];

  const loader = createCollectionLoader();
  loader.loadCollection(collection);
</script>

<h1 class="text-4xl font-bold">
  The Gathering, a binder storage solution for Arkham Horror The Card Game
</h1>

<slot />
