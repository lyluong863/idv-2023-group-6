<script>
  import Carrot from "svg-icons/Carrot.svelte";

  export let title = "Read more information";
  export let onClick;
</script>

{#if onClick}
  <button class="read-more-button" on:click={onClick}>
    <span class="carrot"><Carrot direction="down" strokeWidth="1.5" /></span>
    <span>{title}</span>
  </button>
{/if}

{#if !onClick}
  <span class="carrot"><Carrot direction="down" strokeWidth="1.5" /></span>
  <span>{title}</span>
{/if}

<style>
  .carrot {
    width: 10px;
    margin-right: 10px;
    margin-top: 3px;
  }

  span {
    align-self: center;
  }

  .read-more-button {
    background: none;
    font-family: "Inter";
    color: #797130;
    letter-spacing: 1px;
    font-size: 14px;
    -webkit-font-smoothing: auto;
    font-weight: 500;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    padding: 1rem 2rem;
  }
  
  @media only screen and (max-width: 600px) {
    .read-more-button {
      padding: 0.5rem 0rem;
    }
  }
</style>
