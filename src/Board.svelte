<script>
  import Cell from './Cell.svelte';
  import { getCells } from './lib';

  let board = 10;
  let boardSize = board * board;
  let bombs = 15;
  let cells = getCells(bombs, boardSize);
  let minesLeft = bombs;
  let gameOver = false;

  const calculateNumber = (i, isBomb) => {
    if (isBomb) return '';

    let number = 0;

    //left
    if (cells[i + i]?.isBomb) {
      number++;
    }
    //right
    if (cells[i - 1]?.isBomb) {
      number++;
    }
    //top
    if (cells[i - board]?.isBomb) {
      number++;
    }
    //bottom
    if (cells[i + board]?.isBomb) {
      number++;
    }
    //top-left
    if (cells[i - board - 1]?.isBomb) {
      number++;
    }
    //top-right
    if (cells[i - board + 1]?.isBomb) {
      number++;
    }
    //bottom-right
    if (cells[i + board + 1]?.isBomb) {
      number++;
    }
    //bottom-left
    if (cells[i + board - 1]?.isBomb) {
      number++;
    }
    return number;
  };

  const calculateNumber2 = (i) => {
    const right = cells[i + 1];
    const top = cells[i - board];
    const left = cells[i - 1];
    const bottom = cells[i + board];
    const bottomRight = cells[i + 1 + board];
    const bottomLeft = cells[i - 1 + board];
    const topLeft = cells[i + 1 - board];
    const topRight = cells[i - 1 - board];

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
    if (i === boardSize - (board - 1)) {
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
      //bug
      topRight.value++;
      return;
    }
    //right
    if (boardSize / (i + 1) === 0) {
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

  const handleBoardClick = (e) => {
    if (gameOver) e.stopPropagation();
  };
</script>

<div>
  <div>
    {#if !gameOver}
      <div>Mines Left: {minesLeft}</div>
    {:else}
      <div>Game Over</div>
    {/if}
  </div>
  <div
    class="board"
    on:click|capture={handleBoardClick}
    on:contextmenu|capture={handleBoardClick}
  >
    <!-- n={calculateNumber(i, cell.isBomb) || ''} -->
    {#each cells as cell, i}
      <Cell
        bind:minesLeft
        bind:gameOver
        {cell}
        number={cell.isBomb ? calculateNumber2(i) : ''}
      />
    {/each}
  </div>
</div>

<style>
  .board {
    margin: auto;
    width: 400px;
    height: 400px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    border: 1px solid black;
  }
</style>
