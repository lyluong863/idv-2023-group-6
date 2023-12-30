<script>
  import Slider from "layouts/Slider/index.svelte";
  import { onMount } from "svelte";

  let viewportWidth = 0;
  let viewportHeight = 0;
  let mounted = false;

  onMount(async () => {
    mounted = true;
  });
</script>

<div class="viewport" bind:clientWidth={viewportWidth} bind:clientHeight={viewportHeight}>
  {#if mounted}
    <Slider {viewportWidth} {viewportHeight} />
  {/if}
</div>

<style>
  .viewport {
    width: 100%;
    height: 100%;
  }
</style>
