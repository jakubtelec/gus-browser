import { getRange } from "./helpers.js";

const gettersByMethod = (generalData) => ({
  single: ({ region, year, ageGroup, color }) => ({
    label: year,
    data: generalData[year][region][ageGroup].byWeek,
    borderColor: color,
    backgroundColor: ["white"],
  }),
  avg: ({ start, end, region, ageGroup, color }) => {
    const range = getRange(start, end),
      yearsData = Object.entries(generalData)
        .filter(([yr]) => range.includes(yr))
        .map(([_, byRegion]) => byRegion[region][ageGroup].byWeek);

    const length = yearsData.reduce(
      (acc, next) => (next.length > acc ? next.length : acc),
      0
    );

    const data = [];

    for (let x = 0; x < length; x++) {
      let sum = 0;
      for (let y = 0; y < yearsData.length; y++) {
        sum += yearsData[y][x];
      }
      data.push(sum / yearsData.length);
    }
    return {
      label: `${start} - ${end}`,
      data,
      borderColor: color,
      borderDash: [1, 0, 1],
      backgroundColor: ["white"],
    };
  },
});

const getData = ({
  region,
  method = "single",
  year,
  start,
  end,
  color,
  generalData,
  ageGroup,
}) => {
  return gettersByMethod(generalData)[method]({
    region,
    year,
    start,
    end,
    color,
    ageGroup,
  });
};

export default getData;
