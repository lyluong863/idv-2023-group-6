<script>
  import CountriesHeader from "pages/CountriesPage/Header.svelte";
  import CategoriesHeader from "pages/CategoriesPage/Header.svelte";
  import { categories } from "data/categories";
  export let activeIndex;
  export let viewportWidth;
  export let slideTo;

  const baseValue = 4;
</script>

<div class="header-wrapper header">
  {#if activeIndex === baseValue}
    <CountriesHeader />
  {/if}
  {#if activeIndex > baseValue && activeIndex <= baseValue + categories.length}
    <CategoriesHeader
      {viewportWidth}
      {baseValue}
      {slideTo}
      currentSlidingIndex={activeIndex === 5 ? 1 : activeIndex - baseValue}
    />
  {/if}
</div>

<style>
  .header-wrapper {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    transition: transform 0.5s 0.2s;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 20px;
    max-width: 600px;
    padding-bottom: 50px;
  }
</style>
