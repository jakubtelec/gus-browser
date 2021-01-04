<style>
  .loading-container {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -20px 20px 23px -3px rgba(0, 0, 0, 0.5);
    z-index: 1003;
    border: 1px solid lightgrey;
  }
  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
  }
  .spinner {
    position: relative;
    border-top: 0.33rem solid lightblue;
    border-right: 0.33rem solid lightblue;
    border-bottom: 0.33rem solid lightblue;
    border-left: 0.33rem solid #40a9ff;
    transform: translateZ(0);
    animation: spin 1.1s infinite linear;
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

<div class="loading-container">
  Pobieram dane
  <div class="spinner" />
</div>
