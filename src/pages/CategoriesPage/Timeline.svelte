<script>
  import { roundToNearestMultipleOf5 } from "utils/number";
  import Play from "svg-icons/Play.svelte";
  import Pause from "svg-icons/Pause.svelte";
  let hover = false;

  // Props
  export let min = 0;
  export let max = 100;
  export let value = max;
  export let onValueChange;
  export let barColor;

  // Node Bindings
  let container = null;
  let thumb = null;
  let progressBar = null;

  // Internal State
  let elementX = null;
  let currentThumb = null;
  let timer = null;
  /** Slider controller */

  function resizeWindow() {
    if (elementX) elementX = container.getBoundingClientRect().left;
  }
  // Allows both bind:value and on:change for parent value retrieval
  function setValue(val) {
    value = val;
    onValueChange(val);
  }

  function onTrackEvent(e) {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (!elementX) {
      elementX = container.getBoundingClientRect().left;
    }
    // Update value immediately before beginning drag
    updateValueOnEvent(e);
    onDragStart(e);
  }

  function onDragStart(e) {
    currentThumb = thumb;
  }

  function onDragEnd(e) {
    currentThumb = null;
  }

  function calculateNewValue(clientX) {
    if (!elementX) return;
    // Find distance between cursor and element's left cord (20px / 2 = 10px) - Center of thumb
    let delta = clientX - (elementX + 10);

    // Use width of the container minus (5px * 2 sides) offset for percent calc
    let percent = (delta * 100) / (container.clientWidth - 20);

    // Limit percent 0 -> 100
    percent = roundToNearestMultipleOf5(
      percent < 0 ? 0 : percent > 100 ? 100 : percent
    );

    // Limit value min -> max
    setValue(parseInt((percent * (max - min)) / 100) + min);
  }

  // Handles both dragging of touch/mouse as well as simple one-off click/touches
  function updateValueOnEvent(e) {
    // touchstart && mousedown are one-off updates, otherwise expect a currentPointer node
    if (!currentThumb && e.type !== "touchstart" && e.type !== "mousedown")
      return false;

    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    // Get client's x cord either touch or mouse
    const clientX =
      e.type === "touchmove" || e.type === "touchstart"
        ? e.touches[0].clientX
        : e.clientX;
    calculateNewValue(clientX);
  }

  // Update progressbar and thumb styles to represent value
  $: if (progressBar && thumb) {
    let percent = ((value - min) * 100) / (max - min);

    // Update thumb position + active range track width
    thumb.style.left = `${percent}%`;
    progressBar.style.right = `${100 - percent}%`;
  }

  function onMouseOver() {
    hover = true;
  }

  function onMouseOut() {
    hover = false;
  }

  /** Play handler */

  function onPlay() {
    if(value === max) setValue(min);
    timer = setInterval(() => {
      if (value < max) setValue(value + 1);
      else {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }, 1000);
  }
  function onPause() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
</script>

<svelte:window
  on:touchmove|nonpassive={updateValueOnEvent}
  on:touchcancel={onDragEnd}
  on:touchend={onDragEnd}
  on:mousemove={updateValueOnEvent}
  on:mouseup={onDragEnd}
  on:resize={resizeWindow}
/>

<div class="timeline no-swiping" class:hover>
  <div class="play-button">
    <button class="icon-only" on:click={timer ? onPause : onPlay}>
      {#if timer}
        <Pause />
      {:else}
        <Play />
      {/if}
    </button>
  </div>
  <div class="year" on:click={() => setValue(min)}>{min}</div>
  <div
    class="slider"
    bind:this={container}
    on:mousedown={onTrackEvent}
    on:touchstart={onTrackEvent}
  >
    <div
      class="current-slide"
      style={`left: 0%; background: ${barColor};`}
      bind:this={progressBar}
    ></div>
    <div
      class="marker"
      bind:this={thumb}
      on:touchstart={onDragStart}
      on:mousedown={onDragStart}
      on:mouseover={onMouseOver}
      on:mouseout={onMouseOut}
    >
      <div class="point"></div>
      {#if hover}
        <div class="marker-label-arrow" />
        <div class="marker-label">{value}</div>
      {/if}
    </div>
  </div>
  <div class="year" on:click={() => setValue(max)}>{max}</div>
</div>

<style>
  .timeline {
    width: 500px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    padding: 0 16px;
    gap: 0.5em;
    margin: 0 auto;
    margin-top: 20px;
  }
  .play-button {
    min-width: 32px;
    height: 100%;
    border-radius: 4px;
    position: relative;
  }

  .play-button button {
    display: block;
    padding: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    font-size: 13px;
    font-weight: 500;
    border-radius: inherit;
    background-color: #f2f2f2;
    position: relative;
    letter-spacing: 0.01em;
  }

  .year {
    height: 100%;
    font-size: 13px;
    font-weight: 400;
    padding: 0 8px;
    border-radius: 4px;
    display: grid;
    place-content: center;
    margin-right: 0;
    background-color: #f2f2f2;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
  }

  .slider {
    height: 2px;
    flex-grow: 1;
    background: #e7e7e7;
    background-clip: border-box;
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    padding: 12px 0;
    box-sizing: content-box;
    background-clip: content-box;
    cursor: pointer;
  }

  .current-slide {
    position: absolute;
    height: 2px;
    opacity: 0.4;
    background-clip: border-box;
    cursor: grab;
  }

  .marker {
    position: absolute;
    margin-left: -16px;
    cursor: grabbing;
    padding: 10px 6px;
  }

  .marker .point {
    height: 15px;
    width: 15px;
    border-radius: 100%;
    background-color: #232222;
    border: 2px solid #fff;
    pointer-events: none;
    transform: scale(1);
    transition: transform 0.1s ease-out;
    cursor: col-resize;
  }

  .marker-label-arrow {
    width: 6px;
    height: 6px;
    background-color: #232222;
    color: #eee5e5;
    top: -3px;
    position: absolute;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    z-index: 3;
  }

  .marker-label {
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translate(-50%);
    padding: 8px;
    font-size: 12px;
    line-height: 16px;
    background-color: #232222;
    color: #eee5e5;
    border-radius: 4px;
    width: max-content;
    z-index: 3;
  }
  .hover .current-slide {
    opacity: 0.8;
  }
  .hover .point {
    transform: scale(1.5);
  }
</style>
