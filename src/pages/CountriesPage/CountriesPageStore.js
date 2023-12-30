import { writable } from "svelte/store";
import { countries } from "../../data/countries";

export const orderOptions = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

export const criteriaOptions = [
  { label: "Category", value: "category" },
  { label: "Hours per day", value: "hours" },
];

export const selectedCountries = writable(countries.slice(0, 2));
export const selectedOptions = writable({
  order: "descending", // 'ascending' | 'descending'
  criteria: "category", // sort by 'category' | 'hours'
});
