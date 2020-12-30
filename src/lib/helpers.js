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

export const getRange = (start, end) => {
  const min = Math.min(parseInt(start), parseInt(end)),
    max = Math.max(parseInt(start), parseInt(end));
  return Array.from({ length: max - min + 1 }, (_, idx) =>
    (min + idx).toString()
  );
};

export const getChartSize = (chartContainer) => {
  const windowHeight = window.innerHeight,
    newChartHeight = windowHeight - chartContainer.offsetTop;

  return newChartHeight < windowHeight / 2
    ? newChartHeight * 2
    : newChartHeight;
};
