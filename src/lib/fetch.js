import merge from "lodash.merge";
import { chartDefsToPaths } from "./helpers";

const apiEndpoint = "API_ENDPOINT";

export const fetchData = async ({ chartDefs, dbData }) => {
  const paths = chartDefsToPaths(chartDefs);
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
