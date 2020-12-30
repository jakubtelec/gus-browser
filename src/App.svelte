<script>
  import { onMount, tick } from "svelte";
  import debounce from "lodash.debounce";
  import Line from "svelte-chartjs/src/Line.svelte";
  import DataSelector from "./DataSelector.svelte";
  import {
    getColor,
    refreshIds,
    getRange,
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
    generalData = {},
    chartDefs = tagLast(refreshIds(DEFAULT_VIEWS));

  const updateChartSize = () => {
      chartHeight = getChartSize(chartContainer);
    },
    updateChartSize_deb = debounce(updateChartSize, 300);

  const handlers = {
    modify: (id, data) => {
      const toUpdate =
        data.method === "avg"
          ? [...getRange(data.start, data.end)]
          : [data.year];
      loadMissingData({
        toUpdate,
        chartDefs,
        generalData
      }).then(newData => {
        generalData = newData;
        chartDefs = tagLast(
          chartDefs.map(item => (item.id === id ? data : item))
        );
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
    defs = (await loadSettings()).defs;
    generalData = await loadMissingData({ chartDefs, generalData });
    await tick();
    updateChartSize();
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
  {#if defs && Object.values(generalData).length}
    <DataSelector {defs} bind:chartDefs {handlers} />
    <div
      class="chart-container"
      bind:this={chartContainer}
      style={`height: ${chartHeight}px;`}>
      <Line
        options={{ maintainAspectRatio: false, animation: { duration: 0 } }}
        data={{ labels: TIMELINE_LABELS, datasets: chartDefs
            .filter(Boolean)
            .map(item => getData({ ...item, generalData })) }} />

    </div>
  {/if}
</div>
