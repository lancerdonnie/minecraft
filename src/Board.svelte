<script>
  import Cell from './Cell.svelte';
  import { getCells } from './lib';

  export let board = 10;
  let boardSize = board * board;
  let bombs = 15;
  let cells = getCells(bombs, boardSize);
  let minesLeft = bombs;
  let gameOver = false;
  let won = false;

  const calculateNumber2 = (i) => {
    const right = cells[i + 1];
    const top = cells[i - board];
    const left = cells[i - 1];
    const bottom = cells[i + board];
    const bottomRight = cells[i + 1 + board];
    const bottomLeft = cells[i - 1 + board];
    const topRight = cells[i + 1 - board];
    const topLeft = cells[i - 1 - board];

    //top left
    if (i === 0) {
      right.value++;
      bottom.value++;
      bottomRight.value++;
      return;
    }
    //top right
    if (i === board - 1) {
      left.value++;
      bottom.value++;
      bottomLeft.value++;
      return;
    }
    // bottom left
    // if (i === boardSize - (board - 1)) {
    if (i === boardSize - board) {
      top.value++;
      right.value++;
      topRight.value++;
      return;
    }
    // bottom right
    if (i === boardSize - 1) {
      top.value++;
      left.value++;
      topLeft.value++;
      return;
    }
    //top
    if (i < board) {
      bottom.value++;
      left.value++;
      right.value++;
      bottomLeft.value++;
      bottomRight.value++;
      return;
    }
    //bottom
    if (i >= boardSize - board) {
      top.value++;
      left.value++;
      right.value++;
      topLeft.value++;
      topRight.value++;
      return;
    }
    //left
    if (i % board === 0) {
      top.value++;
      bottom.value++;
      right.value++;
      bottomRight.value++;
      topRight.value++;
      return;
    }
    //right
    if ((i + 1) % board === 0) {
      top.value++;
      bottom.value++;
      left.value++;
      topLeft.value++;
      bottomLeft.value++;
      return;
    }

    // any
    top.value++;
    bottom.value++;
    left.value++;
    right.value++;
    bottomRight.value++;
    topRight.value++;
    topLeft.value++;
    bottomLeft.value++;
  };

  cells.forEach((e) => e.isBomb && calculateNumber2(e.index));

  const handleBoardClick = (e) => {
    if (gameOver) e.stopPropagation();
  };
</script>

<div>
  <div>
    {#if won}
      <div>Congratulations!!! You won</div>
    {:else if !gameOver}
      <div>Mines Left: {minesLeft}</div>
    {:else}
      <div>Game Over</div>
    {/if}
  </div>
  <div
    class="board"
    style="--columns:{board}"
    on:click|capture={handleBoardClick}
    on:contextmenu|capture={handleBoardClick}
  >
    <!-- n={calculateNumber(i, cell.isBomb) || ''} -->
    {#each cells as cell, i}
      <Cell
        {cell}
        bind:minesLeft
        bind:gameOver
        bind:won
        bind:cells
        bind:board
        bind:boardSize
      />
    {/each}
  </div>
</div>

<style>
  .board {
    margin: auto;
    width: max-content;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(var(--columns), 1fr);
    border: 1px solid black;
  }
</style>
