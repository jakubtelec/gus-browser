import { getColor } from "./helpers.js";

const DEF_GROUP = "Ogółem";

export const DEFAULT_VIEWS = [
  {
    method: "single",
    region: "Polska",
    year: "2020",
    start: "2015",
    end: "2020",
    color: getColor(),
    ageGroup: DEF_GROUP,
  },
  {
    method: "single",
    region: "Polska",
    year: "2015",
    start: "2015",
    end: "2020",
    color: getColor(),
    ageGroup: DEF_GROUP,
  },
  {
    method: "single",
    region: "Polska",
    year: "2010",
    start: "2015",
    end: "2020",
    color: getColor(),
    ageGroup: DEF_GROUP,
  },
  {
    method: "single",
    region: "Polska",
    year: "2005",
    start: "2015",
    end: "2020",
    color: getColor(),
    ageGroup: DEF_GROUP,
  },
  {
    method: "avg",
    region: "Polska",
    year: "2000",
    start: "2015",
    end: "2019",
    color: getColor(),
    ageGroup: DEF_GROUP,
  },
];

export const GROUPS = {
  2: "Kraj",
  3: "Makroregiony",
  4: "Regiony",
  5: "Podregiony",
};

export const DEFAULT_ITEM = {
  method: "single",
  region: "Polska",
  year: "2020",
  start: "2015",
  end: "2020",
  ageGroup: DEF_GROUP,
};

export const TIMELINE_LABELS = Array.from({
  length: 53,
}).map((_, i) => `t${i + 1}`);
