import { writable } from "svelte/store";

export const trendlineOptions = [
  { label: "Show trendline", value: true },
  { label: "Hide trendline", value: false },
];

export const criteriaOptions = [
  { label: "Category", value: "category" },
  { label: "Hours per day", value: "hours" },
];

export const selectedOptions = writable({
  trendline: true,
});
