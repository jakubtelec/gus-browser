<script>
  export let chartDef;
</script>

<style>
  .selectRow {
    width: 100%;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    display: flex;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 0.5rem;
    background: white;
  }
  .select-area {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 1rem;
  }
  .actions-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  img {
    cursor: pointer;
  }
  .icon-draggable {
    pointer-events: none;
  }
  .style-icon {
    cursor: pointer;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
  }
  .placeholder {
    margin: 0;
    padding: 0;
    width: 12rem;
    height: 1.6rem;
    background-color: white;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  .animated-background {
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: darkgray;
    background: linear-gradient(to right, white 10%, lightgray 18%, white 33%);
    background-size: 800px 104px;
    height: 1.6rem;
    padding: 0;
    position: relative;
    border-radius: 0.5rem;
  }
</style>

<div class={'selectRow general-select'}>
  <div class="select-area">
    <div class={'icon-draggable'}>
      <img width={'15px'} alt="drag row icon" src={'draggable.svg'} />
    </div>
    <div class={'style-icon'} style={`background-color: ${chartDef.color};`} />
    <div class="placeholder">
      <div class="animated-background" />
    </div>
    <div class="placeholder">
      <div class="animated-background" />
    </div>
    <div class="placeholder">
      <div class="animated-background" />
    </div>
    <div class="placeholder">
      <div class="animated-background" />
    </div>
  </div>
  <div class="actions-area">
    <img src={'copy.svg'} alt="clone row icon" />
    <img src={'remove.svg'} alt="remove row icon" />
  </div>
</div>
