<script lang="ts">
  import './app.css';

  import type { Collection } from '$gathering/Collection';
  import { createCollectionLoader } from '$gathering';

  const collection: Collection = ['Core Set', 'The Feast of Hemlock Vale Campaign Expansion'];
  const loader = createCollectionLoader();
  loader.loadCollection(collection);
</script>

<h1 class="text-4xl font-bold">
  The Gathering, a binder storage solution for Arkham Horror The Card Game
</h1>

<slot />
