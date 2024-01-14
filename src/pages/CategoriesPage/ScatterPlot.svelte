<script>
  import {
    Graphic,
    PointLayer,
    Point,
    XAxis,
    YAxis,
    Line,
    Label,
  } from "@snlab/florence";
  import { getContext } from "svelte";

  import { getCategoriesData } from "data/categories";
  import { splitString } from "utils/string";
  import { calculateTrendLine } from "./calculate-trendline";
  import { displayCountries, selectedCountries } from "./CategoriesPageStore";

  const { all_categories, all_gdp, country_map } = getContext("data");
  export let year = 2020;
  export let compare;
  export let category;
  export let color;
  export let chartInfo;
  let colors = [];
  let radius = [];
  let selectX = null;
  let selectY = null;

  $: categoryData =
    compare !== "population"
      ? getCategoriesData(all_categories, category, all_gdp)
          .filter((row) => !!row.gdpPerYear[year])
          .mutate({
            gdp: (row) => row.gdpPerYear[year],
          })
      : getCategoriesData(all_categories, category, all_gdp).filter(
          (row) => row.population < 150 * 1000000
        );
  $: maxX = categoryData.max("totalHours");
  $: maxY = categoryData.max(compare);
  $: scaleX = [0, maxX];
  $: scaleY = [0, maxY];
  $: x = categoryData.column("totalHours");
  $: y = categoryData.column(compare);
  $: $displayCountries = categoryData
    .column("country_iso3")
    .map((item) => country_map[item]);
  $: {
    if ($selectedCountries.index) {
      selectX = x[$selectedCountries.index];
      selectY = y[$selectedCountries.index];
      x = x.filter((_, i) => i !== $selectedCountries.index);
      y = y.filter((_, i) => i !== $selectedCountries.index);
    }
  }
  $: trendY = calculateTrendLine(y, x);
</script>

<Graphic width={600} height={800} {scaleX} {scaleY} padding={60} flipY>
  <PointLayer {x} {y} fill={color} opacity={0.8} radius={6} />
  <Line {x} y={trendY} stroke={"black"} />

  {#if $selectedCountries.name}
    {#each splitString($selectedCountries.name, 12, "up") as word, i}
      <Label
        x={selectX + (selectX / maxX > 0.9 ? -0.02 : 0.02) * maxX}
        y={selectY + maxY * 0.01 + maxY * 0.02 * (i + 1)}
        text={word}
        anchorPoint={selectX / maxX > 0.8 ? "rt" : "lt"}
        fontFamily={"Barlow"}
        fontWeight={"bold"}
        fontSize={14}
      />
    {/each}
    <Point x={selectX} y={selectY} fill={"black"} radius={8} />
  {/if}

  {#if compare !== "population"}
    <Label
      x={maxX * 0.5}
      y={maxY * 0.95}
      text={year}
      fontFamily={"Barlow"}
      fontWeight={"bold"}
      fontSize={14}
    />
  {/if}

  <XAxis
    labelFont={"Barlow"}
    labelFontSize={12}
    titleFont={"Barlow"}
    titleFontSize={14}
    title={"Hours per day"}
    titleFontWeight={"bold"}
  />
  <YAxis
    labelFormat={chartInfo.yAxisFormat}
    tickExtra={true}
    tickCount={compare !== "population" ? 10 : 15}
    labelFont={"Barlow"}
    labelFontSize={12}
    titleFont={"Barlow"}
    titleFontSize={14}
    titleXOffset={-45}
    title={chartInfo.yAxisLabel}
    titleFontWeight={"bold"}
  />
</Graphic>
