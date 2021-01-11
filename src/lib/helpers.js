import { presetPalettes } from "@ant-design/colors";

export const colors = Object.values(presetPalettes).reduce(
  (acc, next) => [...acc, ...next.slice(2)],
  []
);

let startIdx = 2;
let idx = startIdx;

export const getColor = () => {
  const color = colors[idx];
  idx = idx + 16;
  if (idx > 13 * 8) {
    startIdx++;
    idx = startIdx;
  }
  return color;
};

export const rgb2hex = (rgb) =>
  rgb && rgb.length === 4
    ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : "";

export const refreshIds = (arr) =>
    arr.map((item, id) => ({ ...item, id: id + 1 })),
  tagLast = (defs) =>
    defs.map((def, i) => ({ ...def, last: i === defs.length - 1 }));

export const getChartSize = (chartContainer) => {
  const windowHeight = window.innerHeight,
    newChartHeight = windowHeight - chartContainer.offsetTop;

  return newChartHeight < windowHeight / 2
    ? newChartHeight * 2
    : newChartHeight;
};

export const getPeriodRange = (start, end) => {
  const min = Math.min(parseInt(start), parseInt(end)),
    max = Math.max(parseInt(start), parseInt(end));
  return Array.from({ length: max - min + 1 }, (_, idx) =>
    (min + idx).toString()
  );
};

export const getAgeRange = (start, end, ageGroups) =>
  ageGroups
    .slice(0, ageGroups.indexOf(end) + 1)
    .slice(ageGroups.indexOf(start));

export const sumArrs = (arrs) => {
  const length = arrs.reduce(
    (acc, next) => (next.length > acc ? next.length : acc),
    0
  );
  const sum = [];
  for (let x = 0; x < length; x++) {
    sum[x] = 0;
    for (let y = 0; y < arrs.length; y++) {
      if (arrs[y][x]) sum[x] += arrs[y][x];
    }
  }
  return sum;
};

const pathGetters = [
  ({ gender }) => gender,
  ({ periodMethod, yearStart, yearEnd, year }) =>
    periodMethod === "avg" || periodMethod === "sum"
      ? [yearStart, yearEnd]
      : year,
  ({ region }) => region,
  ({ ageGroupMethod, ageGroupStart, ageGroupEnd, ageGroup }) =>
    ageGroupMethod === "avg" || ageGroupMethod === "sum"
      ? [ageGroupStart, ageGroupEnd]
      : ageGroup,
];

export const chartDefsToPaths = (chartDefs) =>
  chartDefs.map((def) => pathGetters.map((getter) => getter(def)));
