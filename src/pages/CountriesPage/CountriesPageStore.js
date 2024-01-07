import { writable } from "svelte/store";
import { globalItem } from "data/countries";

export const orderOptions = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

export const showingOption = [
  { label: "Category only", value: "category" },
  { label: "Change only", value: "change" },
  { label: "Both", value: "both" },
];

export const selectedCountries = writable([
  globalItem,
  {
    iso: "VNM",
    name: "Viet Nam",
    region: "South-eastern Asia",
    regionIso: "AS_SE",
  },
]);
export const selectedOptions = writable({
  order: "descending",
  showing: "both",
});
