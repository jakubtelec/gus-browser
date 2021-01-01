<script>
  export let defs, chartDef, handlers;
  import { rgb2hex } from "../lib/helpers.js";
  import Select from "svelte-select";
  import StylePicker from "./StylePicker.svelte";
  import { GROUPS } from "../lib/constants.js";

  const periodMethods = [
      { label: "rok", value: "single" },
      {
        label: "średnia z lat",
        value: "avg"
      }
    ],
    ageGroupMethods = [
      { label: "grupa", value: "single" },
      {
        label: "zakres",
        value: "sum"
      }
    ],
    years = defs.years,
    regions = defs.regions.map(({ name, code }) => ({
      label: name,
      value: name,
      group: GROUPS[code.length]
    })),
    ageGroups = defs.ageGroups;

  let selectedPeriodMethod = periodMethods.find(
      def => def.value === chartDef.periodMethod
    ),
    selectedAgeGroupMethod = ageGroupMethods.find(
      def => def.value === chartDef.ageGroupMethod
    );

  let showPicker = false;
  let id = chartDef.id;

  const selectPeriodMethod = event => {
      handlers.modify(id, {
        ...chartDef,
        periodMethod: event.detail.value
      });
    },
    selectAgeGroupMethod = event => {
      handlers.modify(id, {
        ...chartDef,
        ageGroupMethod: event.detail.value
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
    selectAgeGroupStart = event => {
      handlers.modify(id, { ...chartDef, ageGroupStart: event.detail.value });
    },
    selectAgeGroupEnd = event => {
      handlers.modify(id, { ...chartDef, ageGroupEnd: event.detail.value });
    },
    selectYear = event => {
      handlers.modify(id, { ...chartDef, year: event.detail.value });
    },
    selectYearStart = event => {
      handlers.modify(id, { ...chartDef, yearStart: event.detail.value });
    },
    selectYearEnd = event => {
      handlers.modify(id, { ...chartDef, yearEnd: event.detail.value });
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 0.5rem;
    background: white;
  }
  .select-area {
    display: flex;
    justify-content: flex-yearStart;
    align-items: center;
    column-gap: 1rem;
  }
  .actions-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  img {
    cursor: pointer;
  }
  .icon-draggable {
    pointer-events: none;
  }
  .general-select {
    --borderRadius: 0.5rem;
    --padding: 0.2rem;
    --height: 1.5rem;
    --width: 300px;
  }
  .double-select {
    --border: none;
    display: flex;
  }
  .left-select {
    border: 1px solid lightgrey;
    border-radius: 0.5rem 0rem 0rem 0.5rem;
  }
  .right-select {
    border: 1px solid lightgrey;
    border-left: none;
    border-radius: 0rem 0.5rem 0.5rem 0rem;
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

<div class={'selectRow general-select'}>
  <div class="select-area">
    <div class={'icon-draggable'}>
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
    <div>Wiek:</div>
    <div>
      <Select
        items={ageGroupMethods}
        isClearable={false}
        selectedValue={selectedAgeGroupMethod}
        on:select={selectAgeGroupMethod} />
    </div>

    {#if chartDef.ageGroupMethod === 'single'}
      <div>
        <Select
          items={ageGroups}
          isClearable={false}
          selectedValue={chartDef.ageGroup}
          on:select={selectAgeGroup} />
      </div>
    {:else if chartDef.ageGroupMethod === 'sum'}
      <div class="double-select">
        <div class="left-select">
          <Select
            items={ageGroups.slice(1)}
            isClearable={false}
            selectedValue={chartDef.ageGroupStart}
            on:select={selectAgeGroupStart} />
        </div>
        <div class="right-select">
          <Select
            items={ageGroups.slice(1)}
            isClearable={false}
            selectedValue={chartDef.ageGroupEnd}
            on:select={selectAgeGroupEnd} />
        </div>
      </div>
    {/if}
    <div>Okres:</div>
    <div>
      <Select
        items={periodMethods}
        isClearable={false}
        selectedValue={selectedPeriodMethod}
        on:select={selectPeriodMethod} />
    </div>
    {#if chartDef.periodMethod === 'single'}
      <div>
        <Select
          items={years}
          isClearable={false}
          selectedValue={chartDef.year}
          on:select={selectYear} />
      </div>
      <div />
    {:else if chartDef.periodMethod === 'avg'}
      <div class="double-select">
        <div class="left-select">
          <Select
            items={years}
            isClearable={false}
            selectedValue={chartDef.yearStart}
            on:select={selectYearStart} />
        </div>
        <div class="right-select">
          <Select
            items={years}
            isClearable={false}
            selectedValue={chartDef.yearEnd}
            on:select={selectYearEnd} />
        </div>
      </div>
    {/if}
  </div>
  <div class="actions-area">
    <img src={'copy.svg'} on:click={() => handlers.clone(chartDef)} />
    <img src={'remove.svg'} on:click={() => handlers.remove(chartDef)} />
  </div>

</div>
