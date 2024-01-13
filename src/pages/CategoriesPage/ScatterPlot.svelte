<script>
  import { Graphic, PointLayer, XAxis, YAxis, Line } from "@snlab/florence";
  import { getContext } from "svelte";

  import { getCategoriesData } from "data/categories";
  import { calculateTrendLine } from "./calculate-trendline";

  const { all_categories, all_gdp } = getContext("data");
  export let trendLine;
  export let compare;
  export let category;
  export let color;
  export let chartInfo;

  $: categoryData =
    compare !== "population"
      ? getCategoriesData(all_categories, category, all_gdp)
      : getCategoriesData(all_categories, category, all_gdp).filter(
          (row) => row.population < 150 * 1000000
        );
  $: scaleX = [0, categoryData.max("totalHours")];
  $: scaleY = [0, categoryData.max(compare)];
  $: x = categoryData.column("totalHours");
  $: y = categoryData.column(compare);
  $: trendY = trendLine ? calculateTrendLine(y, x) : [];
</script>

<Graphic width={600} height={800} {scaleX} {scaleY} padding={60} flipY>
  <PointLayer {x} {y} fill={color} opacity={0.8} radius={6} />
  {#if trendLine}
    <Line {x} y={trendY} stroke={"black"} />
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
