<script>
  import Slider from "layouts/Slider/index.svelte";
  import { onMount } from "svelte";

  let viewportWidth = 0;
  let mounted = false;

  onMount(async () => {
    mounted = true;
  });
</script>

<div class="viewport" bind:clientWidth={viewportWidth}>
  {#if mounted}
    <Slider {viewportWidth} />
  {/if}
</div>

<style>
  .viewport {
    width: 100%;
    height: 100%;
  }
</style>
