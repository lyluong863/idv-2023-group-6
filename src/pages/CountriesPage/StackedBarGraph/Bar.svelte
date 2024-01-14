<script>
  import { Rectangle, Line, Point, Label } from "@snlab/florence";
  import { splitString } from "utils/string";

  //expect one value
  export let x1;
  export let x2;
  export let y1;
  export let y2;

  export let lineLength;
  export let strokeWidth;
  export let linePosition; //expect 'up' or 'down'
  export let pointRadius;

  export let fontSize;
  export let mainLabel;
  export let subLabel;
  export let lineHeight;
  export let textDirection; //expect 'up' or 'down'

  export let color;

  $: center = (x1 + x2) / 2;
  $: lineInfo = {
    x: [center, center],
    y: linePosition === "up" ? [y1, y1 - lineLength] : [y2, y2 + lineLength],
  };
  $: textInfo = {
    x: center,
    y:
      linePosition === "up"
        ? y1 - lineLength - lineHeight - 0.005
        : y2 + lineLength + lineHeight + 0.005,
  };

  const pointToLabel = 0.015;
</script>

<Rectangle {x1} {x2} {y1} {y2} fill={color} />
{#each splitString(subLabel, 12, textDirection) as word, i}
  <Label
    x={textInfo.x}
    y={textInfo.y + pointToLabel + lineHeight * (i + 1)}
    {fontSize}
    text={word}
    fontFamily={"Barlow"}
    fontWeight={"300"}
  />
{/each}
<Label
  x={textInfo.x}
  y={textInfo.y}
  {fontSize}
  fontFamily={"Barlow"}
  fontWeight={"600"}
  text={mainLabel}
/>
<Line x={lineInfo.x} y={lineInfo.y} stroke={color} {strokeWidth} />
<Point x={center} y={lineInfo.y[1]} fill={color} radius={pointRadius} />
