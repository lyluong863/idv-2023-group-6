<script>
  import { SwiperSlide } from "swiper/svelte";
  import { categories } from "data/categories";
  import ReadMoreButton from "components/ReadMoreButton.svelte";
  import GraphWrapper from "components/GraphWrapper.svelte";

  import { selectedOptions } from "./CategoriesPageStore";
  import ScatterPlot from "./ScatterPlot.svelte";
  import { compareGDPInfo, comparePopulationInfo } from "./content";
  import { colorSchemes } from "data/color";

  export let viewportWidth;
  export let viewportHeight;
  let showMoreInfo = false;
  const showMoreToggle = () => (showMoreInfo = !showMoreInfo);
  let viewportLimit;

  $: if (viewportHeight < 900) {
    viewportLimit = {
      scale: "scale(0.8)",
    };
  } else if (viewportWidth < 1100 || viewportHeight < 1000) {
    viewportLimit = {
      scale: "scale(0.9)",
    };
  } else {
    viewportLimit = {
      scale: "scale(1.1)",
    };
  }

  $: chartInfo =
    $selectedOptions.compare === "population"
      ? comparePopulationInfo
      : compareGDPInfo;
</script>

{#each categories as category, index}
  <SwiperSlide>
    <div class="swiper-slide-flex explore-slide">
      <GraphWrapper
        {viewportWidth}
        {viewportLimit}
        title={category.name}
        subtitle={"Hours per day " + chartInfo.chartLabel}
        styles={viewportLimit.margin}
      >
        <ScatterPlot
          {chartInfo}
          color={colorSchemes[index][0]}
          category={category.name}
          compare={$selectedOptions.compare}
          trendLine={$selectedOptions.trendLine}
          slot="graph"
        />
      </GraphWrapper>

      <div class="read-more" class:showMoreInfo>
        <ReadMoreButton onClick={showMoreToggle} />
        {#if showMoreInfo}
          <div class="read-more-content">
            <ul>
              {@html chartInfo[category.name]}
              {#if $selectedOptions.compare === "population"}
                <li>
                  In order to minimize variance and data dispersion in the
                  chart, we have excluded the eight countries with a population
                  above 150 million people
                </li>
              {/if}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </SwiperSlide>
{/each}
