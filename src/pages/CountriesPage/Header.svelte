<script>
  import { getContext } from "svelte";

  import {
    selectedCountries,
    selectedOptions,
    orderOptions,
    showingOption,
  } from "./CountriesPageStore";
  import ButtonSet from "components/ButtonSet.svelte";
  import Dropdown from "components/Dropdown/index.svelte";

  const { country_regions } = getContext("data");

  // Dropdown handler
  function onFirstCountrySelect(newCountry) {
    $selectedCountries[0] = newCountry;
  }

  function onSecondCountrySelect(newCountry) {
    $selectedCountries[1] = newCountry;
  }
</script>

<ButtonSet
  legend={"Sort order"}
  legendPosition={"left"}
  options={orderOptions}
  bind:value={$selectedOptions.order}
/>
<ButtonSet
  legend={"Show"}
  legendPosition={"left"}
  options={showingOption}
  bind:value={$selectedOptions.showing}
/>
<div class="comparison">
  <Dropdown
    legend={"Let's make an comparison between"}
    currentValue={$selectedCountries[0]}
    currentTitle={$selectedCountries[0].name}
    disabled={$selectedCountries}
    menuList={country_regions.map((item) => ({
      label: item.name,
      value: item,
    }))}
    inputPlaceholder={"Search a country"}
    compareFn={(item, value) =>
      item.label.toLowerCase().match(value.toLowerCase())}
    onSelect={onFirstCountrySelect}
  />

  <Dropdown
    legend={"and"}
    currentValue={$selectedCountries[1]}
    currentTitle={$selectedCountries[1].name}
    disabled={$selectedCountries}
    menuList={country_regions.map((item) => ({
      label: item.name,
      value: item,
    }))}
    inputPlaceholder={"Search a country"}
    compareFn={(item, value) =>
      item.label.toLowerCase().match(value.toLowerCase())}
    onSelect={onSecondCountrySelect}
  />
</div>

<style>
  .comparison {
    display: flex;
    gap: 1em;
    margin-top: 10px;
  }
</style>
