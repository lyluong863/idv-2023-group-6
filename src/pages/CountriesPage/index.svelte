<script>
  import { getContext, onDestroy } from "svelte";
  import { SwiperSlide } from "swiper/svelte";

  import { getCountriesData } from "data/countries";
  import ReadMoreButton from "components/ReadMoreButton.svelte";
  import { selectedCountries, selectedOptions } from "./CountriesPageStore";
  import StackedBarGraph from "./StackedBarGraph/index.svelte";
  import {
    preprocessData,
    calculateChange,
    generateComparision,
  } from "./data-process";

  let showMoreInfo = false;
  let countriesData = {};
  let comparison = "";
  export let viewportWidth;
  export let viewportHeight;

  let viewportLimit = {
    scale: "",
    shranked: "scale(0.95);",
  };

  const { all_countries } = getContext("data");

  $: if (viewportWidth < 900 || viewportHeight < 600) {
    viewportLimit = {
      scale: "scale(0.6)",
      shranked: "scale(0.55) translate(0, -1%)",
    };
  } else if (viewportHeight < 900) {
    viewportLimit = {
      scale: "scale(0.8)",
      shranked: "scale(0.75) translate(0, -1%)",
    };
  } else if (viewportWidth <= 1100 || viewportHeight < 1000) {
    viewportLimit = {
      scale: "scale(0.9)",
      shranked: "scale(0.9) translate(0, -1%)",
    };
  } else {
    viewportLimit = {
      scale: "",
      shranked: "scale(0.95) translate(0, -1%)",
    };
  }

  const showMoreToggle = () => (showMoreInfo = !showMoreInfo);
  const unsubscribe = selectedCountries.subscribe(([first, second]) => {
    const [rawFirstCountries, rawFirstCountriesCat] = preprocessData(
      getCountriesData(all_countries, first.iso),
      first.iso === "GLOBAL"
    );
    const [rawSecondCountries, rawSecondCountriesCat] = preprocessData(
      getCountriesData(all_countries, second.iso),
      second.iso === "GLOBAL"
    );
    const [firstCountries, secondCountries] = calculateChange(
      rawFirstCountries,
      rawSecondCountries
    );
    const [firstCountriesCat, secondCountriesCat] = calculateChange(
      rawFirstCountriesCat,
      rawSecondCountriesCat
    );
    countriesData = {
      firstCountries,
      firstCountriesCat,
      secondCountries,
      secondCountriesCat,
    };
    comparison = generateComparision(
      first.name,
      second.name,
      firstCountries,
      secondCountries
    );
  });

  onDestroy(unsubscribe);
</script>

<SwiperSlide>
  <div class="swiper-slide-flex">
    {#if Object.keys(countriesData).length}
      <div
        class="graph-container"
        style:transform={showMoreInfo
          ? viewportLimit.shranked
          : viewportLimit.scale}
      >
        <StackedBarGraph
          subcategoryData={countriesData.firstCountries}
          totalCategoryData={countriesData.firstCountriesCat}
          title={$selectedCountries[0].name.toUpperCase()}
          order={$selectedOptions.order}
          showing={$selectedOptions.showing === "both"
            ? "category"
            : $selectedOptions.showing}
          {viewportWidth}
          {viewportHeight}
          position="up"
        />
        <StackedBarGraph
          subcategoryData={countriesData.secondCountries}
          totalCategoryData={countriesData.secondCountriesCat}
          title={$selectedCountries[1].name.toUpperCase()}
          order={$selectedOptions.order}
          showing={$selectedOptions.showing === "both"
            ? "change"
            : $selectedOptions.showing}
          {viewportWidth}
          {viewportHeight}
          position="down"
        />
      </div>
    {/if}
    <div class="read-more" class:showMoreInfo>
      <ReadMoreButton onClick={showMoreToggle} />
      {#if showMoreInfo}
        <div class="read-more-content no-swiping">
          <ul>
            <li>
              {`We're comparing the activities spend time between ${$selectedCountries[0].name} and ${$selectedCountries[1].name}`}
            </li>
            <li>
              {comparison}
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</SwiperSlide>

<style>
  .graph-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    text-align: center;
    flex-direction: column;
    max-height: 600px;
    transition: transform 0.3s;
  }
</style>
