<script>
  import { SwiperSlide } from "swiper/svelte";
</script>

<SwiperSlide>
  <div class="swiper-slide-flex">
    <div class="text-slide-content">
      <p><span class="pHed">Conclusion</span></p>
      <blockquote class="hed">
        "If we are to sustainably navigate climate change and biodiversity loss,
        adapt to rapid technological change, and achieve global development
        goals it is crucial to understand the big picture of how the global
        human system functions, so that we can see where there is potential for
        change"
      </blockquote>
      <p>
        The Global Human Day project offers a panoramic view of how we allocate
        these ‘coins’. Every human activity, from sustenance to leisure, reveals
        a unique facet of our existence. This exploration intricately unveils
        the variances among nations and regions, illustrating the interplay of
        cultural, economic, and social factors in time allocation. Understanding
        these ‘daily investments’ paves the path for informed decisions,
        societal progress, and a richer understanding of how humanity adapts
        within life's ever-ticking clock.
      </p>
    </div>
  </div>
</SwiperSlide>

<style>
  .hed {
    padding-top: 20px;
    font-size: 28px;
    line-height: 1.3;
    text-align: left;
  }

  .hed .smaller {
    opacity: 1;
  }

  @media only screen and (max-height: 900px) {
    .hed {
      font-size: 18px;
    }
  }
</style>
