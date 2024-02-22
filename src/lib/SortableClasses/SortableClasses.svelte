<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { DragDrop } from '$lib/dragDrop';

  import BasicWeaknessIcon from './BasicWeaknessIcon.svelte';
  import GuardianIcon from './GuardianIcon.svelte';
  import MultiIcon from './MultiClassIcon.svelte';
  import MysticIcon from './MysticIcon.svelte';
  import NeutralIcon from './NeutralIcon.svelte';
  import RogueIcon from './RogueIcon.svelte';
  import SeekerIcon from './SeekerIcon.svelte';
  import SurvivorIcon from './SurvivorIcon.svelte';
  import type { PlayerCardClass } from '$gathering/ICollectionOrganizer';

  export let classes: Writable<PlayerCardClass[]>;

  const icons = {
    'basic weakness': BasicWeaknessIcon,
    guardian: GuardianIcon,
    mystic: MysticIcon,
    rogue: RogueIcon,
    seeker: SeekerIcon,
    survivor: SurvivorIcon,
    neutral: NeutralIcon,
    multi: MultiIcon,
  };

  const dragDrop = new DragDrop<PlayerCardClass>(classes);
</script>

<div>
  {#each $classes as klass, index}
    <button
      on:dragend={() => dragDrop.onDragEnd()}
      on:dragenter={() => dragDrop.onDragEnter(index)}
      on:dragover={(event) => dragDrop.onDragOver(event)}
      on:dragstart={() => dragDrop.onDragStart(index)}
      on:drop={() => dragDrop.onDragDrop()}
      ><svelte:component
        this={icons[klass]}
        class="size-20 rounded-full hover:shadow-md hover:shadow-black"
      />
    </button>
  {/each}
</div>
