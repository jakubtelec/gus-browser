<script>
  import { onMount, tick } from "svelte";
  import debounce from "lodash.debounce";
  import Line from "svelte-chartjs/src/Line.svelte";
  import DataSelector from "./components/DataSelector.svelte";
  import Loading from "./components/Loading.svelte";
  import {
    getColor,
    refreshIds,
    getPeriodRange,
    getChartSize,
    tagLast,
    chartDefToPath
  } from "./lib/helpers.js";
  import getData from "./lib/getter.js";
  import { loadMissingData, loadSettings } from "./lib/fetch.js";
  import {
    DEFAULT_VIEWS,
    TIMELINE_LABELS,
    DEFAULT_ITEM
  } from "./lib/constants.js";

  let chartContainer,
    defs,
    chartHeight,
    loading,
    dbData = {},
    chartDefs = tagLast(refreshIds(DEFAULT_VIEWS));

  const updateChartSize = () => {
      chartHeight = getChartSize(chartContainer);
    },
    updateChartSize_deb = debounce(updateChartSize, 300);

  const handlers = {
    modify: (id, data) => {
      loading = true;
      loadMissingData({
        toUpdate: chartDefToPath(data),
        chartDefs,
        dbData
      }).then(newData => {
        dbData = newData;
        chartDefs = tagLast(
          chartDefs.map(item => (item.id === id ? data : item))
        );
        loading = false;
      });
    },
    remove: data => {
      chartDefs = tagLast(
        refreshIds(chartDefs.filter(item => item.id !== data.id))
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
    clone: data => {
      chartDefs = tagLast(refreshIds([...chartDefs, { ...data }]));
      tick().then(updateChartSize);
    }
  };

  onMount(async () => {
    loading = true;
    defs = (await loadSettings()).defs;
    await tick();
    updateChartSize();
    dbData = await loadMissingData({ chartDefs, dbData });
    loading = false;
    await tick();
    updateChartSize();
  });
  window.addEventListener("resize", updateChartSize_deb);
</script>

<style>
  .viewport {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100vw;
    /* height: 100vh; */
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
</style>

<div class="viewport">
  <div class="content-container">
    {#if defs}
      <DataSelector {defs} bind:chartDefs {handlers} />
      <div
        class="chart-container"
        bind:this={chartContainer}
        style={`height: ${chartHeight}px;`}>
        <Line
          options={{ maintainAspectRatio: false, animation: { duration: 0, legend: { labels: { boxWidth: 10 } } } }}
          data={Object.values(dbData).length ? { labels: TIMELINE_LABELS, datasets: chartDefs.map(
                  item => getData({ ...item, dbData }, defs)
                ) } : {}} />

      </div>
    {/if}
    {#if loading}
      <Loading />
    {/if}
  </div>
</div>
