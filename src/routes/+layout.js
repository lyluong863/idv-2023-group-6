import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import DataContainer from "@snlab/florence-datacontainer";
import { getCountries } from "data/countries";

export const prerender = true;
export async function load() {
  const [all_countries, country_regions] = await Promise.all([
    csv(
      "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2023/2023-09-12/all_countries.csv",
      autoType
    ),
    csv(
      "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2023/2023-09-12/country_regions.csv",
      autoType
    ),
  ]);
  const allCountries = new DataContainer(all_countries);
  const allCategories = allCountries.groupBy("Category")
  allCategories.setKey("Category")
  return {
    all_countries: allCountries,
    all_categories: allCategories,
    country_regions: getCountries(
      new DataContainer(country_regions),
      allCountries
    ),
  };
}
