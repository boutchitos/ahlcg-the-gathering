<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { GroupByTitle } from '$gathering/CollectionOrganizer/group-cards-in-pockets/grouper-config';

  export let groupByTitle: Writable<GroupByTitle>;
</script>

<div class="flex flex-col">
  <label
    ><input
      class="mr-3"
      bind:group={$groupByTitle}
      type="radio"
      name="groupByTitle"
      value="disabled"
    />1 card per pocket</label
  >
  <label
    ><input
      class="mr-3"
      bind:group={$groupByTitle}
      type="radio"
      name="groupByTitle"
      value="group-by-title-same-level"
    />group copies by title (same level)</label
  >
  <label
    ><input
      class="mr-3"
      bind:group={$groupByTitle}
      type="radio"
      name="groupByTitle"
      value="group-by-title-any-level"
    />group copies by title (any level)</label
  >
</div>
