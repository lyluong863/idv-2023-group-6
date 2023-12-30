<script>
  import { SwiperSlide } from "swiper/svelte";

  import { selectedCountries, selectedOptions } from "./CountriesPageStore";

  import ReadMoreButton from "components/ReadMoreButton.svelte";
  import StackedBarGraph from "./StackedBarGraph.svelte";

  let showMoreInfo = false;
  export let viewportWidth;
  export let viewportHeight;

  $: console.log(viewportHeight)

  let viewportLimit = {
    scale: "",
    shranked: "scale(0.9);",
  };

  $: if (viewportWidth < 700 || viewportHeight < 600) {
    viewportLimit = {
      scale: "scale(0.35)",
      shranked: "scale(0.35) translate(0, -90%)",
    };
  } else if (viewportWidth <= 1100 || viewportHeight < 1000) {
    viewportLimit = {
      scale: "scale(0.8)",
      shranked: "scale(0.7) translate(0, -20%)",
    };
  } else {
    viewportLimit = {
      scale: "",
      shranked: "scale(0.9) translate(0, -10%)",
    };
  }

  const showMoreToggle = () => (showMoreInfo = !showMoreInfo);
</script>

<SwiperSlide>
  <div class="swiper-slide-flex">
    <div class="text-slide-content">
      <p>Let's make an comparison between A and B</p>
    </div>

    <div
      class="graph-container"
      class:shranked={showMoreInfo && viewportWidth >= 700}
      style:transform={showMoreInfo ? viewportLimit.shranked : viewportLimit.scale}
    >
      <StackedBarGraph />
      <StackedBarGraph />
    </div>
    <div class="read-more" class:showMoreInfo>
      <ReadMoreButton onClick={showMoreToggle} />
      {#if showMoreInfo}
        <div class="read-more-content">
          <ul>
            <li>
              Compared with the global average, Vietnamese spend less time on
              active recreation, allocation, food preparation, and sleep &
              bedrest, and more time on artifacts, buildings, energy, food
              growth & collection, food processing, and human transportation
            </li>
            <li>
              Selected countries is: {$selectedCountries[0].name} and {$selectedCountries[1]
                .name}
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              pulvinar at felis vel vestibulum. Sed in volutpat ligula.
              Curabitur lobortis lectus a odio scelerisque, at commodo libero
              mollis. Maecenas quam felis, consequat sed cursus sed, sodales et
              ipsum. Aliquam et interdum sem, ac fringilla nibh. Sed vitae sem
              aliquam, bibendum nisl quis, cursus mi. Cras vel volutpat magna,
              ut ullamcorper lorem.
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
    gap: 30px;
    transition: transform 0.3s;
  }

  .shranked {
    margin-bottom: 15%;
  }
</style>
