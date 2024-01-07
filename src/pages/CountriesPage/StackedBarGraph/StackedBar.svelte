<script>
  import { Section } from "@snlab/florence";
  import { scaleLinear } from "d3-scale";
  import { calculateLineLength } from "./calculateLineLength";
  import Bar from "./Bar.svelte";

  export let data; //expect data-container with 3 columns: barName, barLength, mainLabel
  export let showAllLine = true;
  export let showing;
  export let linePosition;
  export let textDirection;

  $: enoughBandWidthForLabel = showing === "category" ? 2 : 0.5;
  const y1 = 0;
  const y2 = 0.18;
  const distanceGap = 0.16;
  const lineHeight = 0.055;
  const fontSize = 8.5;

  const barPadding = 1;

  $: transformed = data
    .cumsum({ xValue: "barLength" }, { asInterval: true })
    .transform((columns) => {
      const xLine = columns.xValue.map(
        (item, i) => item[0] + columns.barLength[i] / 2
      );
      const lineLength = calculateLineLength(
        xLine,
        enoughBandWidthForLabel,
        y1,
        distanceGap
      );
      return { ...columns, lineLength };
    });

  const total = 24;
  const scaleX = scaleLinear().domain([0 - barPadding, total + barPadding]);
  const scaleY = scaleLinear().domain([0, 1.275]);
</script>

<Section {scaleX} {scaleY}>
  {#key showing}
    {#each transformed
      .rows()
      .reverse() as { xValue, lineLength, mainLabel, barName, color }}
      <Bar
        x1={xValue[0] + barPadding / 2}
        x2={xValue[1] + barPadding / 2}
        {y1}
        {y2}
        {lineLength}
        {linePosition}
        {textDirection}
        {color}
        {mainLabel}
        subLabel={barName}
        {showAllLine}
        {fontSize}
        strokeWidth={1}
        pointRadius={2}
        {lineHeight}
      />
    {/each}
  {/key}
</Section>
