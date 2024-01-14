import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import DataContainer from "@snlab/florence-datacontainer";
import { getCountries } from "data/countries";
import { convertNumber } from "utils/number";

export const prerender = true;
export async function load() {
  const [all_countries, country_regions, gdp_per_capita] = await Promise.all([
    csv(
      "https://lyluong863.github.io/idv-2023-group-6/data/all_countries.csv",
      autoType
    ),
    csv(
      "https://lyluong863.github.io/idv-2023-group-6/data/country_regions.csv",
      autoType
    ),
    csv(
      "https://lyluong863.github.io/idv-2023-group-6/data/gdp_per_capita.csv",
      autoType
    ),
  ]);
  const allCountries = new DataContainer(all_countries);
  const allGdp = gdp_per_capita.reduce((acc, item) => {
    acc[item.country_iso3] = Array(21)
      .fill(0)
      .map((_, i) =>
        item[1999 + i] === "n/a" ? 0 : convertNumber(item[1999 + i + 1])
      )
      .reduce((acc, item, i) => {
        acc[1999 + i + 1] = item;
        return acc;
      }, {});
    return acc;
  }, {});
  const everyCountriesWithRegion = new DataContainer(country_regions)
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
  const allCategories = allCountries.groupBy("Category");
  allCategories.setKey("Category");
  return {
    all_countries: allCountries,
    all_gdp: allGdp,
    all_categories: allCategories,
    country_regions: getCountries(everyCountriesWithRegion, allCountries),
    country_map: everyCountriesWithRegion,
  };
}
