<script>
  import { categories } from "data/categories";
  import ButtonSet from "components/ButtonSet.svelte";
  import Dropdown from "components/Dropdown/index.svelte";
  import {
    selectedOptions,
    selectedCountries,
    compareOptions,
    displayCountries,
  } from "./CategoriesPageStore";

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

<ButtonSet
  legend={"Compare"}
  legendPosition={"left"}
  options={compareOptions}
  bind:value={$selectedOptions.compare}
/>

<Dropdown
  legend={"Find in graph"}
  currentValue={$selectedCountries}
  currentTitle={$selectedCountries?.name || "Select country"}
  menuList={$displayCountries.map((item, i) => ({
    label: item.name,
    value: { ...item, index: i },
  }))}
  inputPlaceholder={"Search a country"}
  compareFn={(item, value) =>
    item.label.toLowerCase().match(value.toLowerCase())}
  onSelect={(value) => ($selectedCountries = value)}
/>
