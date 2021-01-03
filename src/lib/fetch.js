import merge from "lodash.merge";
import { chartDefToPath } from "./helpers";

const apiEndpoint = "API_ENDPOINT";

export const loadMissingData = async ({ toUpdate = [], chartDefs, dbData }) => {
  const pathsInDefs = chartDefs.reduce(
    (acc, next) => [...acc, ...chartDefToPath(next)],
    []
  );

  const paths = [
    ...new Set(
      [...toUpdate, ...pathsInDefs]
        .filter(([gender, year]) => !dbData[gender] || !dbData[gender][year])
        .map(([gender, year]) => `${gender}.${year}`)
    ),
  ];

  // no updates needed
  if (!paths.length) return dbData;
  //
  const response = await (
    await fetch(
      apiEndpoint +
        "data?" +
        new URLSearchParams({
          paths: JSON.stringify(paths),
        })
    )
  ).json();

  return merge(dbData, response);
};

export const loadSettings = async () =>
  (await fetch(apiEndpoint + "settings")).json();
