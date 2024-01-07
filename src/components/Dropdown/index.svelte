<script>
  import { clickOutside } from "utils/clickOutside.js";
  import DropdownItem from "./DropdownItem.svelte";
  import DropdownSearch from "./DropdownSearch.svelte";

  export let legend;
  export let disabled; // array of disabled value
  export let currentValue; //current value
  export let currentTitle; //current title
  export let menuList; //expect array of {value, label}
  export let menuTitle; //message or [openMessage, closeMessage]
  export let allowSearch = true; // true | false
  export let inputPlaceholder; //placeholder for input
  export let compareFn; //compareFn for filter feature
  export let onSelect; //trigger when value is select

  let menuOpen = false;
  let inputValue = "";
  let filteredItems = [];

  $: console.log(disabled)

  function onInputChange() {
    return (filteredItems = menuList.filter((item) =>
      compareFn(item, inputValue)
    ));
  }
  function onButtonClick() {
    menuOpen = !menuOpen;
  }

  function onItemClick(itemValue) {
    onSelect(itemValue);
    menuOpen = false;
  }

  function onClickOutside() {
    if (menuOpen) menuOpen = false;
  }
</script>

<div class="dropdown-set">
  {#if legend}<div class="legend">{legend}</div>{/if}
  <div class="dropdown" use:clickOutside on:click_outside={onClickOutside}>
    <div class="option" on:click={onButtonClick}>
      <span>
        {currentTitle}
      </span>
    </div>
    <div class:show={menuOpen} class="dropdown-content">
      {#if allowSearch}
        <DropdownSearch
          bind:inputValue
          {onInputChange}
          placeholder={inputPlaceholder}
        />
      {/if}
      {#each inputValue ? filteredItems : menuList as { label, value }}
        <DropdownItem
          {label}
          {value}
          {onItemClick}
          isSelect={value === currentValue}
          isDisable={disabled.find(item => value.iso === item.iso)}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .dropdown-set {
    display: flex;
    align-items: baseline;
  }

  .legend {
    padding-right: 0.5em;
    font-family: "Inter";
    font-weight: 600;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }

  span {
    appearance: none;
    user-select: none;
    line-height: 1;
    margin: 0;
    padding: 0.2em 0;
    border-radius: 0;
    font-size: 18px;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    display: inline-block;
    border-bottom: 1px solid #b4b4b4;
  }

  span:before {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% + 0.3em);
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 5px solid #ac1919;
    transform: translate(-50%, 0);
  }

  .option:hover {
    box-shadow: 0 0 4px 0 var(--color-focus);
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    min-width: 103px;
    max-height: 170px;
    overflow: auto;
    border: 1px solid #b4b4b4;
    z-index: 1;
  }

  .show {
    display: block;
  }
</style>
