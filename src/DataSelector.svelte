<script>
  import { dndzone } from "svelte-dnd-action";
  import DataSelectorItem from "./DataSelectorItem.svelte";
  import { flip } from "svelte/animate";
  import { tagLast } from "./lib/helpers.js";

  export let defs, chartDefs, handlers;

  const flipDurationMs = 200;

  const handleConsider = e => {
    chartDefs = e.detail.items;
  };

  const handleFinalize = e => {
    chartDefs = tagLast(e.detail.items);
  };

  const transformDraggedElement = el => {
    Object.assign(el.style, {
      "box-shadow": "-20px 20px 23px -3px rgba(0, 0, 0, 0.5)",
      outline: "none",
      "border-radius": "1rem"
    });
  };
</script>

<style>
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
    grid-auto-rows: 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    padding-bottom: 1rem;
    outline: none;
  }
  .item {
    display: flex;
    outline: none;
  }
  .add-button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
</style>

<div>
  <section
    class={'container'}
    use:dndzone={{ items: chartDefs, flipDurationMs, transformDraggedElement, dropTargetStyle: { outline: 'none' } }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}>
    {#each chartDefs as item (item.id)}
      <div class="item" animate:flip={{ duration: flipDurationMs }}>
        <DataSelectorItem {defs} chartDef={item} {handlers} />
        {#if item.last}
          <div class="add-button">
            <img src={'add.svg'} on:click={handlers.add} />
          </div>
        {/if}
      </div>
    {/each}
  </section>

</div>
