<script>
  export let viewportWidth;
  export let styles;
  export let title;
  export let subtitle;
  export let viewportLimit; // {scale, graph}
</script>

<div class="explain-graph" style={styles}>
  <div class={viewportWidth < 700 ? "graph-mobile" : "graph"}>
    <div class="graph-outer" style:height={viewportLimit.height}>
      <div class="graph-inner" style:transform={viewportLimit.scale}>
        <slot name="graph" />
      </div>
    </div>

    <div class="description">
      <p class="title-text">{title}</p>
      <p class="subtitle">{subtitle}</p>
    </div>
  </div>
</div>

<style>
  .explain-graph {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .explain-graph .graph {
    flex-grow: 1;
  }

  .explain-graph .graph-mobile {
    bottom: 60px;
    position: relative;
  }

  .explain-graph .graph-outer {
    position: relative;
    margin: 0 auto;
  }

  .graph-inner {
    transition: height 0.3s;
    max-height: 500px;
    position: relative;
    height: calc(100% - 50px);
  }

  .title-text {
    font-size: 18px;
    font-weight: 600;
    -webkit-font-smoothing: auto;
  }

  .subtitle {
    font-size: 18px;
    font-style: normal;
  }
</style>
