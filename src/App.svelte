<script>
  import Board from './Board.svelte';
</script>

<main>
  <Board />
</main>

<style>
  main {
    text-align: center;
    padding-top: 1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
