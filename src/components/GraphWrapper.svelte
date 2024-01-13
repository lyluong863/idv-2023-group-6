<script>
  export let viewportWidth;
  export let styles;
  export let title;
  export let subtitle;
  export let viewportLimit; // {scale, graph}
</script>

<div class="explain-graph" style={styles}>
  <div class="graph-inner" style:transform={viewportLimit.scale}>
    <slot name="graph" />
    <div class="description">
      <p class="title-text">{title}</p>
      <p class="subtitle">{subtitle}</p>
    </div>
  </div>
</div>

<style>
  .explain-graph {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
    flex-direction: column;
  }

  .explain-graph .graph-outer {
    position: relative;
    margin: 0 auto;
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
