<script>
  export let chartDefs, presets, selectedPreset, updateData;

  import Select from "svelte-select";
  import { tagLast, refreshIds } from "../lib/helpers.js";
  import { loadMissingData } from "../lib/fetch.js";

  const presetsList = Object.keys(presets);

  const selectPreset = async event => {
    chartDefs = presets[event.detail.value];
    console.log(chartDefs);
    await updateData();
  };
</script>

<style>
  .general-select {
    --borderRadius: 0.5rem;
    --padding: 0.2rem;
    --height: 1.5rem;
    --width: 300px;
    display: flex;
    padding: 0.25rem 0.75rem 0.5rem 0rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
  }
</style>

<div class="general-select">
  <Select
    items={presetsList}
    isClearable={false}
    selectedValue={selectedPreset}
    on:select={selectPreset} />
</div>
