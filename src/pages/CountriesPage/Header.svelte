<script>
  import {
    selectedCountries,
    selectedOptions,
    orderOptions,
    criteriaOptions,
  } from "./CountriesPageStore";
  import { countries } from "../../data/countries";
  import ButtonSet from "components/ButtonSet.svelte";
  import Dropdown from "components/Dropdown/index.svelte";

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
  legend={"Sort by"}
  legendPosition={"left"}
  options={criteriaOptions}
  bind:value={$selectedOptions.criteria}
/>
<div class="comparison">
  <Dropdown
    legend={"Comparison between"}
    currentValue={$selectedCountries[0]}
    currentTitle={$selectedCountries[0].name}
    menuTitle={"Select countries"}
    menuList={countries.map((item) => ({ label: item.name, value: item }))}
    inputPlaceholder={"Search a country"}
    compareFn={(item, value) =>
      item.label.toLowerCase().match(value.toLowerCase())}
    onSelect={onFirstCountrySelect}
  />

  <Dropdown
    legend={"and"}
    currentValue={$selectedCountries[1]}
    currentTitle={$selectedCountries[1].name}
    menuTitle={"Select countries"}
    menuList={countries.map((item) => ({ label: item.name, value: item }))}
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
