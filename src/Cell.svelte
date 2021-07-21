<script>
  export let cell;
  export let number;
  export let minesLeft;
  export let gameOver;

  let flagged = false;
  let clicked = false;
  const { isBomb, value } = cell;

  const handleClick = (e) => {
    clicked = true;
    if (isBomb) {
      gameOver = true;
      return;
    }
  };

  const handleContextClick = (e) => {
    flagged = !flagged;
    if (flagged) minesLeft--;
    else minesLeft++;
  };
</script>

<div
  on:click|once={handleClick}
  on:contextmenu|preventDefault={handleContextClick}
  class="cell"
  class:flagged
  class:clicked
  class:isBomb
>
  <!-- {(() => {
    if (isBomb) return '';
    return value || ''; //
    // if (number > 0 && clicked) return number;
    // return '';
  })()} -->
  {isBomb ? '' : value}
</div>

<style>
  .cell {
    /* background-color: gray; */
    border: #eee 1px solid;
  }

  .flagged,
  .isBomb {
    background-color: red;
  }
  .clicked {
    background-color: white;
  }
</style>
