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

<div class="flex h-screen flex-col items-center">
  <div class="flex gap-4 text-lg">
    <a href="/collection/">View your Collection</a>
    <a href="/collection/organize">Organize your Collection</a>
    <a href="/collection/edit">Edit your Collection</a>
  </div>

  <slot />

  <h1 class="sticky top-[100vh] mb-3 justify-center text-4xl">
    The Gathering, a binder storage solution for Arkham Horror: The Card Game
  </h1>
</div>
