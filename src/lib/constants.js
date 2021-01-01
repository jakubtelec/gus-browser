import { getColor } from "./helpers.js";

const ageGroup = "Ogółem";
const yearStart = "2015",
  yearEnd = "2020";
const ageGroupStart = "0 - 4",
  ageGroupEnd = "90 i więcej";

export const DEFAULT_VIEWS = [
  {
    periodMethod: "single",
    ageGroupMethod: "single",
    region: "Polska",
    year: "2020",
    yearStart,
    yearEnd,
    color: getColor(),
    ageGroup,
    ageGroupStart,
    ageGroupEnd,
  },
  {
    periodMethod: "single",
    ageGroupMethod: "sum",
    region: "Polska",
    year: "2020",
    yearStart,
    yearEnd,
    color: getColor(),
    ageGroup,
    ageGroupStart,
    ageGroupEnd: "60 - 64",
  },
  {
    periodMethod: "single",
    ageGroupMethod: "sum",
    region: "Polska",
    year: "2020",
    yearStart,
    yearEnd,
    color: getColor(),
    ageGroup,
    ageGroupStart: "65 - 69",
    ageGroupEnd,
  },
  // {
  //   periodMethod: "single",
  //   ageGroupMethod: "single",
  //   region: "Polska",
  //   year: "2010",
  //   yearStart,
  //   yearEnd,
  //   color: getColor(),
  //   ageGroup,
  //   ageGroupStart,
  //   ageGroupEnd,
  // },
  // {
  //   periodMethod: "single",
  //   ageGroupMethod: "single",
  //   region: "Polska",
  //   year: "2005",
  //   yearStart,
  //   yearEnd,
  //   color: getColor(),
  //   ageGroup,
  //   ageGroupStart,
  //   ageGroupEnd,
  // },
  // {
  //   periodMethod: "avg",
  //   ageGroupMethod: "single",
  //   region: "Polska",
  //   year: "2000",
  //   yearStart: "2015",
  //   yearEnd: "2019",
  //   color: getColor(),
  //   ageGroup,
  //   ageGroupStart,
  //   ageGroupEnd,
  // },
];

export const GROUPS = {
  2: "Kraj",
  3: "Makroregiony",
  4: "Regiony",
  5: "Podregiony",
};

export const DEFAULT_ITEM = {
  periodMethod: "single",
  ageGroupMethod: "single",
  region: "Polska",
  year: "2020",
  yearStart,
  yearEnd,
  ageGroup,
  ageGroupStart,
  ageGroupEnd,
};

export const TIMELINE_LABELS = Array.from({
  length: 53,
}).map((_, i) => `t${i + 1}`);
