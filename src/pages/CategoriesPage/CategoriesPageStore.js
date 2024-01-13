import { writable } from "svelte/store";

export const trendLineOptions = [
  { label: "Show trendLine", value: true },
  { label: "Hide trendLine", value: false },
];

export const compareOptions = [
  { label: "GDP per capital", value: "gdp" },
  { label: "Population", value: "population" },
];

export const selectedOptions = writable({
  trendLine: true,
  compare: "gdp",
});
