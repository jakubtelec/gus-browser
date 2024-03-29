<script>
  import { onMount, tick } from "svelte";
  import debounce from "lodash.debounce";
  import {
    getColor,
    refreshIds,
    getChartSize,
    tagLast,
  } from "./lib/helpers.js";
  import getData from "./lib/getter.js";
  import { fetchData, loadSettings } from "./lib/fetch.js";
  import PRESETS from "./lib/presets.json";
  import { TIMELINE_LABELS, DEFAULT_ITEM } from "./lib/constants.js";
  import Line from "svelte-chartjs/src/Line.svelte";
  import DataSelector from "./components/DataSelector.svelte";
  import Loading from "./components/Loading.svelte";
  import Header from "./components/Header.svelte";

  let selectedPreset = Object.keys(PRESETS)[0];

  let chartContainer,
    defs,
    chartHeight,
    loading = true,
    dbData = {},
    chartDefs = tagLast(refreshIds(PRESETS[selectedPreset]));

  const updateChartSize = () => {
      chartHeight = getChartSize(chartContainer);
    },
    updateChartSize_deb = debounce(updateChartSize, 300);

  const handlers = {
    modify: (id, data) => {
      loading = true;
      fetchData({
        chartDefs: [data],
        dbData,
      }).then((newData) => {
        dbData = newData;
        chartDefs = tagLast(
          chartDefs.map((item) => (item.id === id ? { ...data } : item))
        );
        loading = false;
      });
    },
    remove: (data) => {
      chartDefs = tagLast(
        refreshIds(chartDefs.filter((item) => item.id !== data.id))
      );
      tick().then(() => {
        chartHeight = getChartSize(chartContainer);
      });
    },
    add: () => {
      chartDefs = tagLast(
        refreshIds([...chartDefs, { ...DEFAULT_ITEM, color: getColor() }])
      );
      tick().then(updateChartSize);
    },
    clone: (data) => {
      chartDefs = tagLast(refreshIds([...chartDefs, { ...data }]));
      tick().then(updateChartSize);
    },
  };

  const updateData = async (defs) => {
    loading = true;
    dbData = await fetchData({ chartDefs: defs || chartDefs, dbData });
    loading = false;
  };

  onMount(async () => {
    defs = (await loadSettings()).defs;
    await tick();
    updateChartSize();
    await updateData();
    tick().then(updateChartSize);
  });

  window.addEventListener("resize", updateChartSize_deb);

  $: displayData = !loading || Object.values(dbData).length;
</script>

<div class="viewport">
  <div class="content-container">
    <Header
      bind:chartDefs
      bind:selectedPreset
      {updateData}
      {updateChartSize}
      presets={PRESETS}
    />
    <DataSelector {defs} bind:chartDefs {handlers} />
    {#if defs}
      <div
        class="chart-container"
        bind:this={chartContainer}
        style={`height: ${chartHeight}px;`}
      >
        <Line
          options={{ maintainAspectRatio: false, animation: { duration: 0 } }}
          data={displayData
            ? {
                labels: TIMELINE_LABELS,
                datasets: chartDefs.map((item) => ({
                  ...getData({ ...item, dbData }, defs),
                  steppedLine: true,
                })),
              }
            : { labels: TIMELINE_LABELS }}
        />
      </div>
    {/if}
    {#if loading}
      <Loading />
    {/if}
  </div>
</div>

<style>
  .viewport {
    font-size: 14px;
    display: flex;
    justify-content: center;
    position: relative;
    width: 100vw;
  }
  .content-container {
    position: relative;
    margin: 0;
    padding-top: 0.5rem;
  }
  .chart-container {
    position: relative;
    width: 100%;
    padding: 0.5rem 0;
    box-sizing: border-box;
  }

  @media all and (max-width: 1000px) {
    .viewport {
      font-size: 12px;
    }
  }
</style>
