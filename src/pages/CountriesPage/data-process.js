import { colorSchemes } from "data/color.js";
import { categories } from "data/categories.js";
//pre-process data, to adding category and color for each sub-category
const categoryMap = categories.reduce((result, { name, subCategories }) => {
  subCategories.forEach((act) => {
    result[act] = name;
  });
  return result;
}, {});
const colorMap = categories.reduce((result, { name }, i) => {
  result[name] = colorSchemes[i];
  return result;
}, {});

//Convert time to readable format
function convertTime(hour) {
  const hours = Math.floor(hour);
  const minutes = Math.round((hour - hours) * 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function preprocessData(inputData, needComputeCategory) {
  const dataContainer = (
    needComputeCategory
      ? inputData.mutate({
          Category: (row) => categoryMap[row.Subcategory],
        })
      : inputData
  )
    .mutate({
      //the arrange method not working properly with array instruction, so I have to workaround
      categoryAndHour: (row) => row.Category + row.hoursPerDay,
    })
    .arrange({ categoryAndHour: "descending" });
  const [categoryIndex] = dataContainer.column("Category").reduce(
    ([acc, prev, counter], current) => {
      if (prev !== current) counter = 0;
      else counter++;
      acc.push(counter);
      return [acc, current, counter];
    },
    [[], null, 0]
  );
  dataContainer.addColumn("categoryIndex", categoryIndex);
  const subCategoryData = dataContainer
    .mutate({
      mainLabel: (row) => convertTime(row.hoursPerDay),
      color: (row) => colorMap[row.Category][row.categoryIndex + 1],
    })
    .rename({ hoursPerDay: "barLength" });

  //Compute data for cumulative category bar
  const categoryData = dataContainer
    .groupBy("Category")
    .summarise({ hoursPerDay: { hoursPerDay: "sum" } })
    .mutate({
      color: (row) => colorMap[row.Category][0],
      mainLabel: (row) => convertTime(row.hoursPerDay),
      //the arrange method not working properly with array instruction, so I have to workaround
      categoryAndHour: (row) => row.Category + row.hoursPerDay,
    })
    .rename({ hoursPerDay: "barLength" });
  return [subCategoryData, categoryData];
}

export function calculateChange(firstData, secondData) {
  const firstBarLength = firstData.column("barLength");
  const secondBarLength = secondData.column("barLength");
  const updatedFirstData = firstData.transform((columns) => {
    const changeLabel = columns.barLength.map((value, i) => {
      const change = value - secondBarLength[i];
      const label = change === 0 ? "00m" : convertTime(Math.abs(change));
      return change < 0 ? "-" + label : "+" + label;
    });
    return { changeLabel, ...columns };
  });
  const updatedSecondData = secondData.transform((columns) => {
    const changeLabel = columns.barLength.map((value, i) => {
      const change = value - firstBarLength[i];
      const label = change === 0 ? "00m" : convertTime(Math.abs(change));
      return change < 0 ? "-" + label : "+" + label;
    });
    return { changeLabel, ...columns };
  });
  return [updatedFirstData, updatedSecondData];
}
