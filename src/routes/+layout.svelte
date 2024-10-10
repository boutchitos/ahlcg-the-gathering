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

<div class="flex w-full grow flex-col overflow-hidden sm:flex-row">
  <div class="md:1/4 w-full shrink grow-0 p-4 sm:w-1/3">
    Main
    <ul class="sticky top-0 flex p-2 sm:flex-col">
      <a href="/collection/">View your Collection</a>
      <a href="/collection/organize">Organize your Collection</a>
      <a href="/collection/edit">Edit your Collection</a>
    </ul>
  </div>
  <main class="h-full w-full grow overflow-auto p-3">
    <slot />
  </main>
</div>
<footer class="mt-auto">
  <hr />
  <h1 class="text-center text-4xl">
    The Gathering, a binder storage solution for Arkham Horror: The Card Game
  </h1>
</footer>
