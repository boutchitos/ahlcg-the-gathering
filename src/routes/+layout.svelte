<script lang="ts">
  import './app.css';

  import { createCollectionLoader } from '$gathering';

  const isBrowser = typeof window !== 'undefined';

  const collection =
    isBrowser && typeof localStorage.collection === 'string'
      ? JSON.parse(localStorage.collection)
      : [];

  const loader = createCollectionLoader();
  loader.loadCollection(collection);
</script>

<div class="flex flex-col items-center">
  <h1 class="text-4xl font-bold">The Gathering</h1>
  <div class="flex gap-4">
    <a href="/collection/">View your Collection</a>
    <a href="/collection/edit">Edit your Collection</a>
    <a href="/icons">Icons showcase</a>
  </div>

  <slot />

  <h1 class="justify-center text-4xl font-bold">
    a binder storage solution for Arkham Horror: The Card Game
  </h1>
</div>
