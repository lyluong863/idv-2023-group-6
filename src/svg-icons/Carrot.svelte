<script>
  export let direction = "right"; // left | right | up | down
  export let stroke = "#7E7E7E";
  export let strokeWidth = "2.5";

  const rotateMap = {
    right: "0",
    down: "90",
    left: "180",
    up: "270",
  };
</script>

<svg
  viewBox="0 0 16 27"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style={`transform: rotate(${rotateMap[direction]}deg)`}
>
  <path d="M2 25L13 13.5L2 2" {stroke} stroke-width={strokeWidth} />
</svg>

<style>
  svg {
    width: 100%;
  }
</style>
