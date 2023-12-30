<script>
    export let label;
    export let value;
    export let isSelect;
  
    export let onItemClick;
    export let onMouseover;
    export let onMouseout;
  
    function onClick() {
      onItemClick(value);
    }
  </script>
  
  <div
    class="dropdown-item"
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
  
    .select,
    .dropdown-item:hover {
      background-color: #232222;
      color: #eee5e5;
    }
  </style>
  