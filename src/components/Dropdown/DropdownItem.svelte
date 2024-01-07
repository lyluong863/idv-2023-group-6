<script>
  export let label;
  export let value;
  export let isSelect;
  export let isDisable;

  export let onItemClick;
  export let onMouseover;
  export let onMouseout;

  function onClick() {
    if (!isDisable) onItemClick(value);
  }
</script>

<div
  class="dropdown-item"
  class:disabled={!isSelect && isDisable}
  class:select={isSelect}
  on:click={onClick}
  on:mouseover={onMouseover}
  on:mouseout={onMouseout}
>
  {label}
</div>

<style>
  .dropdown-item {
    padding: 4px 6px;
    font-size: 14px;
    text-decoration: none;
    display: block;
    font-weight: 400;
    cursor: pointer;
    background-color: var(--color-bg);
  }

  .select {
    font-weight: bold;
    cursor: default;
  }
  .dropdown-item:not(.disabled):hover {
    background-color: #232222;
    color: #eee5e5;
  }

  .disabled {
    color: #959595;
    cursor: default;
  }
</style>
