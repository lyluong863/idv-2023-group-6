<script>
  import { SwiperSlide } from "swiper/svelte";

  import ExplainGraph from "../../../components/GraphWrapper.svelte";
  import CategoryAnnotation from "./CategoryAnnotation.svelte";
  import SurveyMap from "./SurveyMap.svelte";

  export let viewportWidth;

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
        They then manually classified nearly 4 000 unique activities. And made
        some surprising discoveries.
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
      <ExplainGraph
        title={"Countries in survey"}
        subtitle={"140 countries is survey"}
        {viewportWidth}
        {viewportLimit}
        styles={viewportWidth < 1100
          ? "margin-top: 3%; margin-bottom: 3%;height: 270px;"
          : "margin-right: 3%"}
      >
        <SurveyMap slot="graph" />
      </ExplainGraph>
    </div>
  </div>
</SwiperSlide>

<style>
  .graph-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
</style>
