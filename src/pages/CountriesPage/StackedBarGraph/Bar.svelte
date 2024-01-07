<script>
  import { Rectangle, Line, Point, Label } from "@snlab/florence";

  //expect one value
  export let x1;
  export let x2;
  export let y1;
  export let y2;

  export let lineLength;
  export let strokeWidth;
  export let linePosition; //expect 'up' or 'down'
  export let showAllLine = true; //true | false
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

  function splitString(str) {
    const words = [""];
    const splitted = str.split(" ");
    if (splitted.length > 1) {
      splitted.forEach((word) => {
        if (words[words.length - 1].length + word.length > 15) words.push("");
        words[words.length - 1] += word + " ";
      });
      return textDirection === "up" ? words.reverse() : words;
    } else return splitted;
  }
</script>

<Rectangle {x1} {x2} {y1} {y2} fill={color} />
{#if showAllLine}
  {#each splitString(subLabel, 10) as word, i}
    <Label
      x={textInfo.x}
      y={textInfo.y + lineHeight * (i + 1)}
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
{/if}
