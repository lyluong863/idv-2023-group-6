<script>
    import { SwiperSlide } from "swiper/svelte";
  
    import RightArrowIcon from 'svg-icons/RightArrow.svelte'
    import content from './content.json'
  
    export let viewportWidth;
  </script>
  
  {#each content as card, index}
    <SwiperSlide>
      {@const firstSlide = index == 0}
      {@const secondSlide = index == 1}
      {@const thirdSlide = index == 2}
  
      <div
        class="exposition-slide {card.center
          ? 'flex-center'
          : 'flex-end'} {firstSlide ? 'first-slide' : ''}"
      >
        <div bind:clientHeight={card["height"]} class="slide-content" style={thirdSlide ? "padding-bottom: 20%" : ""}>
          {#each card.text as text}
            <p class={firstSlide ? "center" : ""}>{@html text.value}</p>
          {/each}
          {#if firstSlide}
            <p class="tap">
              Swipe right, scroll down or press Next to continue
              <span class="right-arrow">
                <RightArrowIcon/>
              </span>
            </p>
          {/if}
        </div>
        {#if card.img}
          <div
            data-swiper-parallax-opacity={viewportWidth < 1050 ? 0.3 : 1}
            data-swiper-parallax-scale={viewportWidth < 700 ? 0.6 : 1}
            data-swiper-parallax-y="-25"
            data-swiper-parallax-x="55%"
            class="img-random"
            class:popFirst={secondSlide}
          >
            <img src="assets/{viewportWidth < 700 ? card.imgmobi : card.img}" alt="global-earth-human" />
          </div>
        {/if}
      </div>
    </SwiperSlide>
  {/each}
  
  <style>
    .right-arrow {
      display: inline-block;
      width: 21px;
      margin-left: 10px;
    }
  
    .popFirst {
      transform: translate3d(-55%, 100px, 0);
    }
  
    .img-random {
      max-height: 400px;
      height: 1px;
      flex-grow: 1;
      transform: translate3d(0, 50px, 0) rotate(0deg);
      transition: transform 0.5s;
      margin-top: auto;
    }
  
    .img-random img {
      height: 100%;
      width: auto;
      margin: 0 auto;
    }
  
    @media only screen and (max-height: 700px) {
      .img-random {
        max-height: 300px;
      }
    }
  </style>
  