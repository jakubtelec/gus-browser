<script>
  export let defs, chartDef, handlers;
  import { rgb2hex } from "./lib/helpers.js";
  import Select from "svelte-select";
  import StylePicker from "./StylePicker.svelte";
  import { GROUPS } from "./lib/constants.js";

  const methods = [
      { label: "liczba", value: "single" },
      {
        label: "średnia",
        value: "avg"
      }
    ],
    years = defs.years,
    regions = defs.regions.map(({ name, code }) => ({
      label: name,
      value: name,
      group: GROUPS[code.length]
    })),
    ageGroups = defs.ageGroups;

  let selectedMethod = methods.find(def => def.value === chartDef.method);

  let showPicker = false;
  let id = chartDef.id;

  const selectMethod = event => {
      handlers.modify(id, {
        ...chartDef,
        method: event.detail.value
      });
    },
    selectRegion = event => {
      handlers.modify(id, {
        ...chartDef,
        region: event.detail.value
      });
    },
    selectAgeGroup = event => {
      handlers.modify(id, {
        ...chartDef,
        ageGroup: event.detail.value
      });
    },
    selectYear = event => {
      handlers.modify(id, { ...chartDef, year: event.detail.value });
    },
    selectStart = event => {
      handlers.modify(id, { ...chartDef, start: event.detail.value });
    },
    selectEnd = event => {
      handlers.modify(id, { ...chartDef, end: event.detail.value });
    },
    selectColor = color => {
      handlers.modify(id, { ...chartDef, color });
    },
    switchPicker = e => {
      e.stopPropagation();
      showPicker = !showPicker;
    };

  const groupBy = item => item.group;
</script>

<style>
  .selectRow {
    width: 100%;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    display: grid;
    grid-template-columns: auto auto 3fr repeat(4, 1fr) auto;
    column-gap: 1rem;
    align-content: center;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 0.5rem;
    background: white;
  }

  img {
    cursor: pointer;
  }

  .draggable {
    pointer-events: none;
  }
  .themed {
    --borderRadius: 0.5rem;
    --padding: 0.2rem;
    --height: 1.5rem;
  }
  .style-icon {
    cursor: pointer;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
  }
  .picker-pos {
    position: absolute;
    top: 100%;
    left: 100%;
  }
</style>

<div class={'selectRow themed'}>
  <div class={'draggable'}>
    <img width={'15px'} src={'draggable.svg'} />
  </div>
  <div
    class={'style-icon'}
    style={`background-color: ${chartDef.color};`}
    on:click={switchPicker}>
    {#if showPicker}
      <div class="picker-pos">
        <StylePicker
          color={chartDef.color}
          pickColorHandler={selectColor}
          outsideClickHandler={switchPicker} />
      </div>
    {/if}
  </div>
  <div>
    <Select
      items={regions}
      {groupBy}
      isClearable={false}
      selectedValue={chartDef.region}
      on:select={selectRegion} />
  </div>
  <div>
    <Select
      items={ageGroups}
      isClearable={false}
      selectedValue={chartDef.ageGroup}
      on:select={selectAgeGroup} />
  </div>
  <div>
    <Select
      items={methods}
      isClearable={false}
      selectedValue={selectedMethod}
      on:select={selectMethod} />
  </div>
  {#if chartDef.method === 'single'}
    <div>
      <Select
        items={years}
        isClearable={false}
        selectedValue={chartDef.year}
        on:select={selectYear} />
    </div>

    <div />
  {:else if chartDef.method === 'avg'}
    <div>
      <Select
        items={years}
        isClearable={false}
        selectedValue={chartDef.start}
        on:select={selectStart} />
    </div>
    <div>
      <Select
        items={years}
        isClearable={false}
        selectedValue={chartDef.end}
        on:select={selectEnd} />
    </div>
  {/if}

  <div>

    <img src={'copy.svg'} on:click={() => handlers.clone(chartDef)} />
    <img src={'remove.svg'} on:click={() => handlers.remove(chartDef)} />

  </div>

</div>
