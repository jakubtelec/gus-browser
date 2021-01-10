<script>
  import { tick } from "svelte";
  export let chartDefs, presets, selectedPreset, updateData, updateChartSize;

  import Select from "svelte-select";
  import { tagLast, refreshIds } from "../lib/helpers.js";

  const presetsList = Object.keys(presets);

  const selectPreset = async event => {
    const newDefs = presets[event.detail.value];
    await updateData(newDefs);
    chartDefs = newDefs;
    await tick();
    updateChartSize();
  };
</script>

<style>
  .general-select {
    --borderRadius: 0.5rem;
    --padding: 0.2rem;
    --height: 1.5rem;
    --width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 0rem 0.5rem 0rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
  }
  .select-wrapper {
    min-width: 33%;
  }
</style>

<div class="general-select">
  <div class="select-wrapper">
    <Select
      items={presetsList}
      isClearable={false}
      selectedValue={selectedPreset}
      on:select={selectPreset} />
  </div>
  <a href="https://github.com/jakubtelec/gus-browser" target="_blank">
    <img src={'github.svg'} alt="github page link icon" />
  </a>
</div>
