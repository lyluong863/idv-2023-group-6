import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import DataContainer from "@snlab/florence-datacontainer";
import { getCountries } from "data/countries";

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
    acc[item.country_iso3] =
      typeof item[2020] === "string"
        ? parseFloat(item[2020].replace(/,/g, ""))
        : item[2020];
    return acc;
  }, {});
  const allCategories = allCountries.groupBy("Category");
  allCategories.setKey("Category");
  return {
    all_countries: allCountries,
    all_gdp: allGdp,
    all_categories: allCategories,
    country_regions: getCountries(
      new DataContainer(country_regions),
      allCountries
    ),
  };
}
