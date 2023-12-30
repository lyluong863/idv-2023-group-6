<script>
  import { SwiperSlide } from "swiper/svelte";
  import { categories } from "data/categories";
  import ReadMoreButton from "components/ReadMoreButton.svelte";
  import GraphWrapper from "components/GraphWrapper.svelte";
  import ScatterPlot from "./ScatterPlot.svelte";

  export let viewportWidth;
  export let viewportHeight;
  let showMoreInfo = false;
  const showMoreToggle = () => (showMoreInfo = !showMoreInfo);
  let viewportLimit;

  $: if (viewportWidth < 700 || viewportHeight < 1000) {
    viewportLimit = {
      scale: "scale(0.6)",
      height: "600px",
      margin: "",
    };
  } else if (viewportWidth < 1100 || viewportHeight < 1300) {
    viewportLimit = {
      scale: "scale(0.9)",
      height: "750px",
      margin: "",
    };
  } else {
    viewportLimit = {
      scale: "",
      height: "800px",
      margin: "margin-top: 5%",
    };
  }
</script>

{#each categories as category, index}
  <SwiperSlide>
    <div class="swiper-slide-flex explore-slide">
      <GraphWrapper
        {viewportWidth}
        {viewportLimit}
        title={category.name}
        subtitle={category.name + "#" + (index + 1)}
        styles={viewportLimit.margin}
      >
        <ScatterPlot slot="graph" />
      </GraphWrapper>

      <div class="read-more" class:showMoreInfo>
        <ReadMoreButton onClick={showMoreToggle} />
        {#if showMoreInfo}
          <div class="read-more-content">
            <ul>
              <li>Explain some thing for each graph</li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                pulvinar at felis vel vestibulum. Sed in volutpat ligula.
                Curabitur lobortis lectus a odio scelerisque, at commodo libero
                mollis. Maecenas quam felis, consequat sed cursus sed, sodales
                et ipsum. Aliquam et interdum sem, ac fringilla nibh. Sed vitae
                sem aliquam, bibendum nisl quis, cursus mi. Cras vel volutpat
                magna, ut ullamcorper lorem.
              </li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </SwiperSlide>
{/each}
