<script>
  export let defs, chartDef, handlers;
  import { rgb2hex } from "../lib/helpers.js";
  import Select from "svelte-select";
  import StylePicker from "./StylePicker.svelte";
  import { GROUPS } from "../lib/constants.js";

  const periodMethods = [
      { label: "rok", value: "single" },
      {
        label: "średnia od - do",
        value: "avg"
      },
      {
        label: "suma od - do",
        value: "sum"
      }
    ],
    ageGroupMethods = [
      { label: "grupa", value: "single" },
      {
        label: "suma od - do",
        value: "sum"
      }
    ],
    genders = [
      { label: "M+K", value: "general" },
      { label: "M", value: "males" },
      { label: "K", value: "females" }
    ],
    years = defs.years,
    regions = Object.entries(defs.regions).reduce(
      (acc, [name, code]) => [
        ...acc,
        {
          label: name,
          value: name,
          group: GROUPS[code.length]
        }
      ],
      []
    ),
    ageGroups = defs.ageGroups;

  $: selectedPeriodMethod = periodMethods.find(
    def => def.value === chartDef.periodMethod
  );
  $: selectedAgeGroupMethod = ageGroupMethods.find(
    def => def.value === chartDef.ageGroupMethod
  );
  $: selectedGender = genders.find(def => def.value === chartDef.gender);

  let showPicker = false;
  let id = chartDef.id;

  const makeHandler = key => event => {
    // in case of new props svelte-select handler on:select is triggered
    // therefore to improve performance we should check if new value differs from old one
    if (chartDef[key] !== event.detail.value)
      handlers.modify(id, {
        ...chartDef,
        [key]: event.detail.value
      });
  };

  const selectHandlers = [
    "periodMethod",
    "ageGroupMethod",
    "region",
    "gender",
    "ageGroup",
    "ageGroupStart",
    "ageGroupEnd",
    "year",
    "yearStart",
    "yearEnd"
  ].reduce(
    (acc, handlerName) => ({
      ...acc,
      [handlerName]: makeHandler(handlerName)
    }),
    {}
  );

  const selectColor = color => {
      handlers.modify(id, { ...chartDef, color });
    },
    switchPicker = event => {
      event.stopPropagation();
      showPicker = !showPicker;
    };

  const groupBy = item => item.group;
</script>

<style>
  .selectRow {
    width: 100%;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    display: flex;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 0.5rem;
    background: white;
  }
  .select-area {
    display: flex;
    justify-content: flex-start;
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
    --indicatorHeight: 1rem;
    --indicatorTop: 0.33rem;
  }
  .searchable-select {
    min-width: 6rem;
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
      <img width={'15px'} alt="drag row icon" src={'draggable.svg'} />
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
    <div class="searchable-select">
      <Select
        items={regions}
        {groupBy}
        isClearable={false}
        selectedValue={chartDef.region}
        on:select={selectHandlers.region} />
    </div>
    <div>Płeć:</div>
    <div>
      <Select
        items={genders}
        isSearchable={false}
        isClearable={false}
        selectedValue={selectedGender}
        on:select={selectHandlers.gender} />
    </div>
    <div>Wiek:</div>
    <div>
      <Select
        items={ageGroupMethods}
        isSearchable={false}
        isClearable={false}
        selectedValue={selectedAgeGroupMethod}
        on:select={selectHandlers.ageGroupMethod} />
    </div>

    {#if chartDef.ageGroupMethod === 'single'}
      <div>
        <Select
          items={ageGroups}
          isClearable={false}
          isSearchable={false}
          selectedValue={chartDef.ageGroup}
          on:select={selectHandlers.ageGroup} />
      </div>
    {:else if chartDef.ageGroupMethod === 'sum'}
      <div class="double-select">
        <div class="left-select">
          <Select
            items={ageGroups.slice(1)}
            isClearable={false}
            isSearchable={false}
            selectedValue={chartDef.ageGroupStart}
            on:select={selectHandlers.ageGroupStart} />
        </div>
        <div class="right-select">
          <Select
            items={ageGroups.slice(1)}
            isClearable={false}
            isSearchable={false}
            selectedValue={chartDef.ageGroupEnd}
            on:select={selectHandlers.ageGroupEnd} />
        </div>
      </div>
    {/if}
    <div>Okres:</div>
    <div>
      <Select
        items={periodMethods}
        isClearable={false}
        isSearchable={false}
        selectedValue={selectedPeriodMethod}
        on:select={selectHandlers.periodMethod} />
    </div>
    {#if chartDef.periodMethod === 'single'}
      <div>
        <Select
          items={years}
          isClearable={false}
          isSearchable={false}
          selectedValue={chartDef.year}
          on:select={selectHandlers.year} />
      </div>
      <div />
    {:else if chartDef.periodMethod === 'avg' || chartDef.periodMethod === 'sum'}
      <div class="double-select">
        <div class="left-select">
          <Select
            items={years}
            isClearable={false}
            isSearchable={false}
            selectedValue={chartDef.yearStart}
            on:select={selectHandlers.yearStart} />
        </div>
        <div class="right-select">
          <Select
            items={years}
            isClearable={false}
            isSearchable={false}
            selectedValue={chartDef.yearEnd}
            on:select={selectHandlers.yearEnd} />
        </div>
      </div>
    {/if}
  </div>
  <div class="actions-area">
    <img
      src={'copy.svg'}
      alt="clone row icon"
      on:click={() => handlers.clone(chartDef)} />
    <img
      src={'remove.svg'}
      alt="remove row icon"
      on:click={() => handlers.remove(chartDef)} />
  </div>

</div>
