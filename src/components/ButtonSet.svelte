<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let options = [];
  export let legend = "";
  export let legendPosition = "top";
  export let labelClass = "";
  export let disabled = false;
  export let counting = false;
  export let smallLabel = false;
  export let value; // = options.length ? options[0].value : "";

  function notify(value) {
    dispatch("message", {
      value,
    });
  }

  const id = `legend-${Math.floor(Math.random() * 1000000)}`;
  const makeSlug = (str = "") => `${str}`.toLowerCase().replace(/\W/g, "");

  $: optionsWithSlug = options.map((d) => ({
    ...d,
    val: d.value,
    slug: makeSlug(d.value),
  }));

  $: isTop = legendPosition === "top";
</script>

<div class="button-set" class:counting>
  <div
    id={`group-${id}`}
    class="group"
    class:is-top={isTop}
    role="radiogroup"
    aria-labelledby={`label-${id}`}
  >
    {#if legend}<div class="legend" id="legend-{id}">{legend}</div>{/if}
    <div class="options">
      {#each optionsWithSlug as option}
        <div class="option">
          <input
            type="radio"
            id={`${id}-${option.slug}`}
            name="name-{id}"
            class="sr-only"
            value={option.value}
            on:click={notify(option.value)}
            {disabled}
            bind:group={value}
          />
          <label
            class="option {labelClass}"
            class:smallLabel
            for={`${id}-${option.slug}`}
          >
            {@html option.label || option.value}
          </label>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .counting label {
    font-family: "Inter";
  }

  .counting input[type="radio"] + label {
    color: rgba(0, 0, 0, 0.3);
    padding: 0.5em;
  }

  .counting input[type="radio"]:checked + label:before,
  .counting input[type="radio"]:checked:hover + label:before {
    display: none;
  }

  .counting input[type="radio"]:checked + label,
  .counting input[type="radio"]:checked:hover + label {
    color: black;
    border: none;
    background-color: white;
  }

  .counting.button-set {
    width: 100%;
  }

  .counting .group {
    width: 100%;
  }

  .counting .options {
    justify-content: space-between;
    width: calc(100% - 25px);
    margin: 0 auto;
    gap: 4px;
  }

  .button-set {
    display: inline-block;
    margin-bottom: 4px;
  }

  .group {
    display: flex;
    align-items: center;
  }

  .group.is-top {
    flex-direction: column;
  }

  .is-top .legend {
    padding-bottom: 0.5em;
    padding-right: 0;
  }

  .legend {
    padding-right: 0.5em;
    font-family: "Inter";
    font-weight: 600;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }

  .options {
    display: flex;
  }

  label {
    appearance: none;
    user-select: none;
    line-height: 1;
    margin: 0;
    padding: 0.2em;
    border-radius: 0;
    font-size: 18px;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    display: inline-block;
  }

  .option + .option label {
    border-left-width: 0;
  }

  .option + .option > label {
    border-left-width: 0;
  }

  input[type="radio"] + label {
    /* background: var(--color-white); */
    color: var(--color-gray-900);
  }

  input[type="radio"]:checked + label,
  input[type="radio"]:checked:hover + label {
    border-bottom: 1px solid #b4b4b4;
    position: relative;
    /* background: var(--color-gray-900); */
    /* color: var(--color-white); */
  }

  input[type="radio"]:checked + label:before,
  input[type="radio"]:checked:hover + label:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 5px solid #ac1919;
    transform: translate(-50%, 0);
  }

  input[type="radio"]:hover + label {
    background: var(--color-gray-100);
  }

  input[type="radio"]:focus + label {
    box-shadow: 0 0 4px 0 var(--color-focus);
  }

  input[type="radio"]:disabled + label {
    color: var(--color-gray-700);
    background: var(--color-gray-500);
    cursor: not-allowed;
  }

  .smallLabel {
    font-size: 12px;
    text-align: center;
  }
</style>
