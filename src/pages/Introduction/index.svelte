<script>
  import Opening from "./Opening/index.svelte";
  import Explain from "./Explain/index.svelte";

  export let viewportWidth;
</script>

<Opening {viewportWidth} />
<Explain {viewportWidth} />
