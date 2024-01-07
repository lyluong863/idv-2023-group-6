import DataContainer from "@snlab/florence-datacontainer";

const globalAverage = [
  {
    Subcategory: "Active recreation",
    hoursPerDay: 0.42,
  },
  {
    Subcategory: "Allocation",
    hoursPerDay: 0.91,
  },
  {
    Subcategory: "Artifacts",
    hoursPerDay: 0.42,
  },
  {
    Subcategory: "Buildings",
    hoursPerDay: 0.22,
  },
  {
    Subcategory: "Energy",
    hoursPerDay: 0.04,
  },
  {
    Subcategory: "Food growth & collection",
    hoursPerDay: 0.81,
  },
  {
    Subcategory: "Food preparation",
    hoursPerDay: 0.92,
  },
  {
    Subcategory: "Food processing",
    hoursPerDay: 0.07,
  },
  {
    Subcategory: "Health care",
    hoursPerDay: 0.2,
  },
  {
    Subcategory: "Human transportation",
    hoursPerDay: 0.9,
  },
  {
    Subcategory: "Hygiene & grooming",
    hoursPerDay: 1.05,
  },
  {
    Subcategory: "Infrastructure",
    hoursPerDay: 0.05,
  },
  {
    Subcategory: "Inhabited environment",
    hoursPerDay: 0.75,
  },
  {
    Subcategory: "Interactive",
    hoursPerDay: 0.88,
  },
  {
    Subcategory: "Material transportation",
    hoursPerDay: 0.31,
  },
  {
    Subcategory: "Materials",
    hoursPerDay: 0.07,
  },
  {
    Subcategory: "Meals",
    hoursPerDay: 1.6,
  },
  {
    Subcategory: "Passive",
    hoursPerDay: 2.59,
  },
  {
    Subcategory: "Physical child care",
    hoursPerDay: 0.29,
  },
  {
    Subcategory: "Religious practice",
    hoursPerDay: 0.2,
  },
  {
    Subcategory: "Schooling & research",
    hoursPerDay: 1.07,
  },
  {
    Subcategory: "Sleep & bedrest",
    hoursPerDay: 9.1,
  },
  {
    Subcategory: "Social",
    hoursPerDay: 1.12,
  },
  {
    Subcategory: "Waste management",
    hoursPerDay: 0.01,
  },
];

export const globalItem = {
  name: "Global Average",
  iso: "GLOBAL",
  region: "Global",
  regionIso: "GLOBAL",
};

export function getCountries(countriesWithRegion, allCountriesData) {
  // return {name, iso, regionIso, region}
  const everyCountriesWithRegion = countriesWithRegion
    .select(["country_name", "country_iso3", "region_code", "region_name"])
    .rename({
      country_name: "name",
      country_iso3: "iso",
      region_code: "regionIso",
      region_name: "region",
    })
    .rows()
    .reduce((acc, item) => {
      acc[item.iso] = item;
      return acc;
    }, {});
  const allCountriesWithRegion = allCountriesData
    .groupBy("country_iso3")
    .column("country_iso3")
    .map((item) => everyCountriesWithRegion[item]);
  allCountriesWithRegion.unshift(globalItem);
  return allCountriesWithRegion;
}

export function getCountriesData(allCountries, countryIso) {
  if (countryIso === globalItem.iso) return new DataContainer(globalAverage);
  else
    return allCountries
      .rename({ hoursPerDayCombined: "hoursPerDay" })
      .filter((row) => row.country_iso3 === countryIso);
}
