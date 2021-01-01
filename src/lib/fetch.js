import { getPeriodRange } from "./helpers";

const apiEndpoint = "API_ENDPOINT";

export const loadMissingData = async ({
  toUpdate = [],
  chartDefs,
  generalData,
}) => {
  const yearsInDefs = chartDefs.reduce(
    (acc, { periodMethod, year, yearStart, yearEnd }) =>
      periodMethod === "avg"
        ? [...acc, ...getPeriodRange(yearStart, yearEnd)]
        : [...acc, year],
    []
  );

  const years = [
    ...new Set(
      [...toUpdate, ...yearsInDefs].filter((year) => !generalData[year])
    ),
  ];

  // no updates needed
  if (!years.length) return generalData;
  console.log(`Updating: ${years.length}`);
  //
  const response = await (
    await fetch(
      apiEndpoint +
        "data?" +
        new URLSearchParams({
          years,
        })
    )
  ).json();
  return { ...generalData, ...response };
};

export const loadSettings = async () =>
  (await fetch(apiEndpoint + "settings")).json();
