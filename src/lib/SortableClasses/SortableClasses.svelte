<script lang="ts">
  import { DragDrop } from '$lib/dragDrop';
  import { userOrganizesItsCollection } from '$lib/userOrganizesItsCollection/userOrganizesItsCollection';

  import GuardianIcon from './GuardianIcon.svelte';
  import MultiIcon from './MultiClassIcon.svelte';
  import MysticIcon from './MysticIcon.svelte';
  import NeutralIcon from './NeutralIcon.svelte';
  import RogueIcon from './RogueIcon.svelte';
  import SeekerIcon from './SeekerIcon.svelte';
  import SurvivorIcon from './SurvivorIcon.svelte';

  const classes = userOrganizesItsCollection().classes;

  function toIcon(name: string) {
    switch (name) {
      case 'guardian':
        return GuardianIcon;
      case 'mystic':
        return MysticIcon;
      case 'rogue':
        return RogueIcon;
      case 'seeker':
        return SeekerIcon;
      case 'survivor':
        return SurvivorIcon;
      case 'neutral':
        return NeutralIcon;
      case 'multi':
        return MultiIcon;
    }
  }

  const dragDrop = new DragDrop<string>(classes);
</script>

{#each $classes as klass, index}
  <button
    on:dragend={() => dragDrop.onDragEnd()}
    on:dragenter={() => dragDrop.onDragEnter(index)}
    on:dragover={(event) => dragDrop.onDragOver(event)}
    on:dragstart={() => dragDrop.onDragStart(index)}
    on:drop={() => dragDrop.onDragDrop()}
    ><svelte:component this={toIcon(klass)} />
  </button>
{/each}
