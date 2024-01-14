<script>
  import { SwiperSlide } from "swiper/svelte";
  import ReadMoreButton from "components/ReadMoreButton.svelte";

  import ExplainGraph from "components/GraphWrapper.svelte";
  import CategoryAnnotation from "./CategoryAnnotation.svelte";

  export let viewportWidth;
  let showMoreInfo = false;
  let viewportLimit;

  $: if (viewportWidth < 700) {
    viewportLimit = {
      scale: "scale(1)",
    };
  } else if (viewportWidth < 1100) {
    viewportLimit = {
      scale: "scale(1.2)",
    };
  } else {
    viewportLimit = {
      scale: "scale(1.5)",
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
        Since the data only observed through 140 countries, for each missing
        data type, countries are filled using the population-weighted average of
        the sampled countries in the same region, for each subcategory.
      </p>
    </div>
    <div
      class="graph-container"
      style:flex-direction={viewportWidth < 1100 ? "column" : "row"}
    >
      <ExplainGraph
        title={"Categories use in the survey"}
        subtitle={"All categories in the survey"}
        {viewportLimit}
      >
        <CategoryAnnotation slot="graph" />
      </ExplainGraph>
    </div>
    <div class="read-more" class:showMoreInfo>
      <ReadMoreButton onClick={showMoreToggle} />
      {#if showMoreInfo}
        <div class="read-more-content no-swiping">
          <ul>
            <li>
              This study approach is enabled by a generalized categorization of
              activities, the Motivating-Outcome-Oriented Generalized Activity
              Lexicon (MOOGAL), which allows for the integration of data
              originally collected for diverse sociological, economic, and
              anthropological purposes.
            </li>
            <li>
              The lexicon is comprised of eight categories, which are subdivided
              into 24 subcategories (Figure). The subcategories are described in
              physical, rather than colloquial, terms to limit ambiguity in
              their application across cultures
            </li>
            <li>
              For a detailed description of the full method <a
                href="http://www.pnas.org/lookup/doi/10.1073/pnas.2219564120#supplementary-materials"
                target="_blank">visit this document</a
              >.
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
