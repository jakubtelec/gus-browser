const ageGroup = "Ogółem";
const yearStart = "2015",
  yearEnd = "2020";
const ageGroupStart = "0 - 4",
  ageGroupEnd = "90 i więcej";

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
  gender: "general",
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
