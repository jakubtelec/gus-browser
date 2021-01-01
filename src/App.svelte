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
    tagLast
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
    generalData = {},
    chartDefs = tagLast(refreshIds(DEFAULT_VIEWS));

  const updateChartSize = () => {
      chartHeight = getChartSize(chartContainer);
    },
    updateChartSize_deb = debounce(updateChartSize, 300);

  const handlers = {
    modify: (id, data) => {
      const toUpdate =
        data.periodMethod === "avg"
          ? [...getPeriodRange(data.yearStart, data.yearEnd)]
          : [data.year];
      loading = true;
      loadMissingData({
        toUpdate,
        chartDefs,
        generalData
      }).then(newData => {
        generalData = newData;
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
      chartDefs = tagLast(
        refreshIds([...chartDefs, { ...data, color: getColor() }])
      );
      tick().then(updateChartSize);
    }
  };

  onMount(async () => {
    loading = true;
    defs = (await loadSettings()).defs;
    await tick();
    updateChartSize();
    generalData = await loadMissingData({ chartDefs, generalData });
    loading = false;
    await tick();
    updateChartSize();
    console.log(defs);
  });

  window.addEventListener("resize", updateChartSize_deb);
</script>

<style>
  .chart-container {
    position: relative;
    width: 100%;
  }
</style>

<div>
  {#if defs}
    <DataSelector {defs} bind:chartDefs {handlers} />
    <div
      class="chart-container"
      bind:this={chartContainer}
      style={`height: ${chartHeight}px;`}>
      <Line
        options={{ maintainAspectRatio: false, animation: { duration: 0 } }}
        data={Object.values(generalData).length ? { labels: TIMELINE_LABELS, datasets: chartDefs
                .filter(Boolean)
                .map(item => getData({ ...item, generalData }, defs)) } : {}} />

    </div>
  {/if}
  {#if loading}
    <Loading />
  {/if}
</div>
