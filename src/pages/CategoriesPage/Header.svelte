<script>
  import { categories } from "data/categories";
  import ButtonSet from "components/ButtonSet.svelte";
  import { trendlineOptions, selectedOptions } from "./CategoriesPageStore";

  export let viewportWidth;
  export let currentSlidingIndex;
  export let baseValue;
  export let slideTo;

  $: categoryOptions =
    viewportWidth < 700
      ? categories.map((category, index) => ({
          label: index + 1,
          value: index + 1,
          name: category.name,
        }))
      : categories.map((category, index) => ({
          label: category.name,
          value: index + 1,
        }));

  function handleCategoriesChanges(e) {
    slideTo(baseValue + e.detail.value);
  }
</script>

<ButtonSet
  legend={"Trendline"}
  legendPosition={"left"}
  options={trendlineOptions}
  bind:value={$selectedOptions.trendline}
/>
<div class="counting">
  <ButtonSet
    on:message={handleCategoriesChanges}
    legend={""}
    counting={true}
    legendPosition={"left"}
    smallLabel={viewportWidth >= 700}
    options={categoryOptions}
    bind:value={currentSlidingIndex}
  />
</div>
