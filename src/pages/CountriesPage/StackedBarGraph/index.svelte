<script>
  import { Graphic, Label } from "@snlab/florence";

  import StackedBar from "./StackedBar.svelte";

  export let subcategoryData;
  export let totalCategoryData;
  export let title;
  export let position; // "up" / "down"
  export let order; // sort order: 'ascending' | 'descending'
  export let showing; // showing by: 'category' | 'change'
  export let viewportWidth;
  export let viewportHeight;

  const width = 1080;
  const height = 280;

  $: categoriesSorted = totalCategoryData
    .arrange({
      categoryAndHour: order,
    })
    .rename({
      [showing === "category" ? "Category" : "changeLabel"]: "barName",
    });
  $: subcategoriesSorted = subcategoryData
    .arrange({
      categoryAndHour: order,
    })
    .rename({
      [showing === "category" ? "Subcategory" : "changeLabel"]: "barName",
    });
</script>

<div
  class:top-graph-adjustment={position === "down" &&
    viewportHeight > 900 &&
    viewportWidth > 800}
  class:top-graph-mini-adjustment={position === "down" &&
    viewportHeight <= 900 &&
    viewportWidth > 800}
>
  <Graphic {width} {height} padding={0} flipY>
    <Label
      x={0.05}
      y={0.5}
      fontSize={25}
      fontFamily={"Barlow"}
      fontWeight={"800"}
      text={title}
      anchorPoint={"l"}
    />
    <StackedBar
      linePosition={"down"}
      textDirection={"up"}
      {showing}
      {viewportWidth}
      data={categoriesSorted}
    />
  </Graphic>
</div>

<div
  class:bottom-graph-adjustment={position === "up" && viewportHeight > 900}
  class:bottom-graph-mini-adjustment={position === "up" &&
    viewportHeight <= 900}
>
  <Graphic {width} {height} padding={0}>
    <StackedBar
      linePosition={"down"}
      textDirection={"down"}
      {showing}
      {viewportWidth}
      data={subcategoriesSorted}
    />
  </Graphic>
</div>

<style>
  .top-graph-mini-adjustment {
    margin-top: -75px;
  }
  .top-graph-adjustment {
    margin-top: -60px;
  }
  .bottom-graph-adjustment {
    margin-bottom: -60px;
  }

  .bottom-graph-mini-adjustment {
    margin-bottom: -75px;
  }
</style>
