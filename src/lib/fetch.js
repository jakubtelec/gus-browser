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
  //
  console.log(`Updating: ${years.length}`);
  //
  const response = await (
    await fetch(
      apiEndpoint +
        "data?" +
        new URLSearchParams({
          paths: JSON.stringify(years.map((year) => `general.${year}`)),
        })
    )
  ).json();

  console.log(response);

  return { ...generalData, ...response.general };
};

export const loadSettings = async () =>
  (await fetch(apiEndpoint + "settings")).json();
