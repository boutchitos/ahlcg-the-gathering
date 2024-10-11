<script lang="ts">
  import BasicWeaknessIcon from '$lib/icons/BasicWeaknessIcon.svelte';
  import GuardianIcon from '$lib/icons/GuardianIcon.svelte';
  import MysticIcon from '$lib/icons/MysticIcon.svelte';
  import RogueIcon from '$lib/icons/RogueIcon.svelte';
  import SeekerIcon from '$lib/icons/SeekerIcon.svelte';
  import SurvivorIcon from '$lib/icons/SurvivorIcon.svelte';
</script>

<h2 class="text-xl">Binders</h2>
<ul class="flex content-center justify-between overflow-hidden sm:flex-col">
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder">
      <GuardianIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Root for test</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/guardian">
      <GuardianIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Guardian</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/mystic">
      <MysticIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Mystic</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/rogue">
      <RogueIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Rogue</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/seeker">
      <SeekerIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Seeker</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/survivor">
      <SurvivorIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Survivor</span>
    </a>
  </li>
  <li class="rounded py-2 hover:bg-indigo-300">
    <a class="truncate" href="/binder/everything-else">
      <BasicWeaknessIcon class="mx-2 inline w-7" />
      <span class="hidden sm:inline">Multi-class / Neutral / Weakness </span>
    </a>
  </li>
</ul>
