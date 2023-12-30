<script>
  export let inputValue = "";
  export let placeholder = "";
  export let onInputChange;
</script>

<input
  class="dropdown-search"
  type="text"
  {placeholder}
  autocomplete="off"
  bind:value={inputValue}
  on:input={onInputChange}
/>

<style>
  .dropdown-search {
    box-sizing: border-box;
    font-size: 14px;
    padding: 3.5px 6px;
    border: none;
    width: 103px;
    font-family: inherit;
  }

  .dropdown-search:focus {
    box-shadow: 0 0 4px 0 var(--color-focus);
    outline: none
  }
</style>
