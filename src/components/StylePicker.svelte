<script>
  export let color, pickColorHandler, outsideClickHandler;
  import { colors } from "../lib/helpers.js";
</script>

<style>
  .screen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(10, 1fr);
    background: white;
    padding: 0.5rem;
    box-shadow: -20px 20px 23px -3px rgba(0, 0, 0, 0.5);
    border: 2px solid linen;
    z-index: 1000;
  }
  .color-box {
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    border: 3px white solid;
  }

  .selected {
    animation-name: select-anim;
    animation-duration: 1s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes select-anim {
    from {
      border: 3px white solid;
    }
    to {
      border: 3px grey solid;
    }
  }
</style>

<div>
  <div class="screen" on:click={outsideClickHandler} />
  <div class={'container'}>
    {#each colors as hexColor}
      <div
        class={color === hexColor ? 'color-box selected' : 'color-box'}
        style={`background-color: ${hexColor};`}
        on:click={e => {
          e.stopPropagation();
          pickColorHandler(hexColor);
        }} />
    {/each}
  </div>
</div>
