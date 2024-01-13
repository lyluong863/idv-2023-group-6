<script>
  import { SwiperSlide } from "swiper/svelte";
  import ReadMoreButton from "components/ReadMoreButton.svelte";

  import ExplainGraph from "../../../components/GraphWrapper.svelte";
  import CategoryAnnotation from "./CategoryAnnotation.svelte";

  export let viewportWidth;
  let showMoreInfo = false;
  let viewportLimit;

  $: if (viewportWidth < 700) {
    viewportLimit = {
      scale: "scale(0.5)",
      height: "250px",
    };
  } else if (viewportWidth < 1100) {
    viewportLimit = {
      scale: "scale(0.7)",
      height: "300px",
    };
  } else {
    viewportLimit = {
      scale: "",
      graph: "",
    };
  }
  const showMoreToggle = () => (showMoreInfo = !showMoreInfo);
</script>

<SwiperSlide>
  <div class="swiper-slide-flex">
    <div class="text-slide-content">
      <p>
        The researchers categorized all the things people do in a waking day,
        including both work and non-work activities, according to what the
        purpose of the activity was. They used 24 categories that fall into 8
        groups
      </p>
      <p>
        Since the data only observed through 140 countries, the others are
        interpolated
      </p>
    </div>
    <div
      class="graph-container"
      style:flex-direction={viewportWidth < 1100 ? "column" : "row"}
    >
      <ExplainGraph
        title={"Categories use in the survey"}
        subtitle={"All categories in the survey"}
        {viewportWidth}
        {viewportLimit}
        styles={viewportWidth < 1100
          ? "margin-top: 3%;height: 270px;"
          : "margin-left: 3%"}
      >
        <CategoryAnnotation slot="graph" />
      </ExplainGraph>
    </div>
    <div class="read-more" class:showMoreInfo>
      <ReadMoreButton onClick={showMoreToggle} />
      {#if showMoreInfo}
        <div class="read-more-content">
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              id vehicula felis. Suspendisse tincidunt tempus orci ac varius.
              Suspendisse potenti. Aliquam erat volutpat. Sed in quam blandit,
              vestibulum purus ut, luctus nunc. Suspendisse et lacus at risus
              accumsan dignissim in vehicula est. Morbi tristique pharetra sem
              id laoreet. Sed elementum, leo vel ullamcorper aliquam, nulla
              velit finibus sem, sit amet interdum libero nisl in ipsum
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              id vehicula felis. Suspendisse tincidunt tempus orci ac varius.
              Suspendisse potenti. Aliquam erat volutpat. Sed in quam blandit,
              vestibulum purus ut, luctus nunc. Suspendisse et lacus at risus
              accumsan dignissim in vehicula est. Morbi tristique pharetra sem
              id laoreet. Sed elementum, leo vel ullamcorper aliquam, nulla
              velit finibus sem, sit amet interdum libero nisl in ipsum
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
  }
  @media only screen and (max-width: 700px) {
    .text-slide-content p {
      font-size: 16px;
      margin-top: 10px;
    }
  }
</style>
