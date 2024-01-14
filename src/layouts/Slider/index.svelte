<script>
  import { onMount } from "svelte";

  import { Swiper } from "swiper/svelte";
  import SwiperCore, {
    Controller,
    Mousewheel,
    Pagination,
    Keyboard,
    A11y,
    Parallax,
  } from "swiper/core";
  import "swiper/css";
  import "swiper/css/parallax";

  import Introduction from "pages/Introduction/index.svelte";
  import Countries from "pages/CountriesPage/index.svelte";
  import Categories from "pages/CategoriesPage/index.svelte";
  import Carrot from "svg-icons/Carrot.svelte";
  import SlideHeader from "./Header.svelte";
  import Conclusion from "pages/Conclusion.svelte";
  import References from "pages/References.svelte";

  SwiperCore.use([
    Controller,
    Mousewheel,
    Pagination,
    Controller,
    Keyboard,
    A11y,
    Parallax,
  ]);
  let movingBackwards = false;
  let w = false;
  export let viewportWidth;
  export let viewportHeight;
  let onInit;
  let popFirst = false;
  let swiper;
  let onSlideChange;
  let activeIndex = 0;
  let slideLength;
  let changeDirection;
  let changeDirectionForwards;

  function slideNext() {
    swiper.slideNext();
  }

  function slidePrevious() {
    swiper.slidePrev();
  }

  function slideTo(slideIndex) {
    swiper.slideTo(slideIndex);
  }

  $: if (activeIndex == 0) {
    popFirst = true;
  } else {
    popFirst = false;
  }

  onInit = (e) => {
    [swiper] = e.detail;
    swiper.keyboard.enable();
    swiper.mousewheel.enable();

    slideLength = e.detail[0].slides.length;
  };

  onMount(async () => {
    changeDirection = (e) => {
      movingBackwards = true;
    };

    changeDirectionForwards = (e) => {
      movingBackwards = false;
    };

    onSlideChange = (e) => {
      const [swiper] = e.detail;

      activeIndex = swiper.activeIndex;
    };
  });
</script>

<div
  class="main-swiper {movingBackwards ? 'moving-backwards' : ''} {activeIndex ==
  0
    ? 'opening'
    : ''} {activeIndex === slideLength - 1 ? 'closing' : ''}"
>
  <button class="slide-buttons slide-forward" on:click={slideNext}>
    <div class="carrot">
      <Carrot />
    </div>
  </button>
  <button class="slide-buttons slide-backward" on:click={slidePrevious}>
    <div class="carrot">
      <Carrot direction="left" />
    </div>
  </button>

  <SlideHeader {activeIndex} {viewportWidth} {slideTo} />

  <Swiper
    parallax={true}
    watchSlidesProgress={true}
    noSwiping
    noSwipingClass={"no-swiping"}
    on:slideNextTransitionStart={changeDirectionForwards}
    on:slidePrevTransitionStart={changeDirection}
    on:swiper={onInit}
    on:slideChange={onSlideChange}
    initialSlide="0"
  >
    <Introduction {viewportWidth} />
    <Countries {viewportWidth} {viewportHeight} />
    <Categories {viewportWidth} {viewportHeight} />
    <Conclusion />
    <References />
  </Swiper>
</div>

<style>
  .slide-buttons {
    position: fixed;
    top: 50%;
    z-index: 1000000;
    cursor: pointer;
    transform: translate(0, -50%);
    left: 0;
    right: auto;
    height: 75px;
    width: 50px;
    border: 1px solid rgba(204, 204, 204, 0.43);
    background: #fefcee;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 0px 15px 11px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-buttons:hover {
    background: white;
  }

  .opening .slide-backward {
    display: none;
  }

  .opening .slide-forward {
    background: white;
  }

  .closing .slide-forward {
    display: none;
  }

  .closing .slide-backward {
    background: white;
  }

  .slide-forward {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    left: auto;
    right: 0;
  }

  .slide-buttons .carrot {
    width: 21px;
    margin-left: 8px;
    align-self: center;
  }
  .slide-backward .carrot {
    margin-left: 0;
    margin-right: 8px;
  }

  .opening {
    background: #ffefe3;
    background: white;
  }

  @media only screen and (max-width: 800px) {
    .slide-buttons {
      width: 30px;
      height: 45px;
    }

    .slide-buttons .carrot {
      width: 10px;
    }
  }

  @media only screen and (max-width: 600px) {
    .slide-buttons {
      display: none;
    }

    .opening {
      background: var(--color-bg, white);
    }
  }
</style>
