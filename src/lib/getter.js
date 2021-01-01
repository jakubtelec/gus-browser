import { getPeriodRange, getAgeRange, sumArrs } from "./helpers.js";

const ageGroupByMethod = {
  single: ({ data, ageGroup }) => data[ageGroup].byWeek,
  sum: ({ data, ageGroupStart, ageGroupEnd }, { ageGroups }) =>
    sumArrs(
      getAgeRange(ageGroupStart, ageGroupEnd, ageGroups).map(
        (ageGroup) => data[ageGroup].byWeek
      )
    ),
};

const gettersByMethod = (generalData, defs) => ({
  single: ({
    region,
    year,
    ageGroup,
    color,
    ageGroupMethod,
    ageGroupStart,
    ageGroupEnd,
  }) => ({
    label: year,
    data: ageGroupByMethod[ageGroupMethod](
      {
        data: generalData[year][region],
        ageGroup,
        ageGroupStart,
        ageGroupEnd,
      },
      defs
    ),
    borderColor: color,
    backgroundColor: ["white"],
  }),
  avg: ({
    yearStart,
    yearEnd,
    region,
    ageGroup,
    color,
    ageGroupMethod,
    ageGroupStart,
    ageGroupEnd,
  }) => {
    const range = getPeriodRange(yearStart, yearEnd),
      yearsData = Object.entries(generalData)
        .filter(([yr]) => range.includes(yr))
        .map(([_, byRegion]) =>
          ageGroupByMethod[ageGroupMethod](
            { data: byRegion[region], ageGroup, ageGroupStart, ageGroupEnd },
            defs
          )
        );

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
      label: `${yearStart} - ${yearEnd}`,
      data,
      borderColor: color,
      borderDash: [1, 0, 1],
      backgroundColor: ["white"],
    };
  },
});

const getData = (
  {
    region,
    periodMethod = "single",
    year,
    yearStart,
    yearEnd,
    color,
    generalData,
    ageGroup,
    ageGroupMethod,
    ageGroupStart,
    ageGroupEnd,
  },
  defs
) => {
  return gettersByMethod(generalData, defs)[periodMethod]({
    region,
    year,
    yearStart,
    yearEnd,
    color,
    ageGroup,
    ageGroupMethod,
    ageGroupStart,
    ageGroupEnd,
  });
};

export default getData;
