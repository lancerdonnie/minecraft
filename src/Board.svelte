<script>
  import Cell from './Cell.svelte';
  import { getCells } from './lib';

  let board = 10;
  let bombs = 15;
  let boardSize = board * board;
  let minesLeft = bombs;
  let totalClicked = boardSize - bombs;
  let gameOver = false,
    won = false,
    uncovered = 0;
  let cells = getCells(bombs, boardSize);
  cells.forEach((e) => e.isBomb && calculateNumber(e.index));

  function calculateNumber(i) {
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
  }

  const start = (b, m) => {
    board = b;
    bombs = m;
    boardSize = board * board;
    minesLeft = bombs;
    totalClicked = boardSize - bombs;
    gameOver = false;
    won = false;
    uncovered = 0;
    cells = getCells(bombs, boardSize);
    cells.forEach((e) => e.isBomb && calculateNumber(e.index));
  };

  const handleBoardClick = (e) => {
    if (gameOver) e.stopPropagation();
  };

  const setBoard = (e) => {
    const b = e.target.board.value,
      m = e.target.mines.value;
    if (!b || !m) return;
    if (b > 1000) return;
    start(+b, +m);
  };
</script>

<div>
  <div class="status">
    {#if won}
      <div>Congratulations!!! You won</div>
    {:else if !gameOver}
      <div>Mines Left: {minesLeft}</div>
    {:else}
      <div>Game Over</div>
    {/if}
  </div>
  <form on:submit|preventDefault={setBoard}>
    <div>
      <label for="board">Board</label>
      <input id="board" name="board" type="number" placeholder="10" />
    </div>
    <div>
      <label for="mines">Mines</label>
      <input id="mines" name="mines" type="number" placeholder="15" />
    </div>
    <div><button type="submit">SET</button></div>
  </form>
  <div
    class="board"
    style="--columns:{board}"
    on:click|capture={handleBoardClick}
    on:contextmenu|capture={handleBoardClick}
  >
    {#each cells as cell (cell.key)}
      <Cell
        {cell}
        bind:minesLeft
        bind:gameOver
        bind:won
        bind:cells
        bind:board
        bind:boardSize
        bind:totalClicked
        bind:uncovered
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
    border: 1px solid #eee;
  }

  .status {
    margin-bottom: 20px;
    font-weight: bold;
  }
</style>
