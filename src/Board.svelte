<script>
  import Cell from './Cell.svelte';
  import { getAllCells, getlocal } from './lib';

  let size = getlocal('cell') ?? 40;
  let show = false;
  let board = getlocal('board') ?? 10;
  let bombs = getlocal('bombs') ?? 15;
  let boardSize = board * board;
  let minesLeft = bombs;
  let totalClicked = boardSize - bombs;
  let gameOver = false,
    won = false,
    uncovered = 0;
  let cells = getAllCells(bombs, boardSize, board);

  const start = (b, m) => {
    board = b;
    bombs = m;
    boardSize = board * board;
    minesLeft = bombs;
    totalClicked = boardSize - bombs;
    gameOver = false;
    won = false;
    uncovered = 0;
    cells = getAllCells(bombs, boardSize, board);
  };

  const handleBoardClick = (e) => {
    if (gameOver) e.stopPropagation();
  };

  const setBoard = (e) => {
    let b = e.target.board.value,
      m = e.target.mines.value,
      c = e.target.cell.value;
    if (c) {
      localStorage.cell = c;
      size = +c;
    }
    if (isNaN(b) || isNaN(m)) return;
    b = +b;
    m = +m;
    if (b > 100) return;
    localStorage.board = b;
    localStorage.bombs = m;

    start(b, m);
    show = false;
  };

  const handleRestart = () => {
    gameOver = false;
    minesLeft = bombs;
    totalClicked = boardSize - bombs;
    won = false;
    uncovered = 0;
    cells = getAllCells(bombs, boardSize, board);
  };
</script>

<div>
  <button on:click={handleRestart}>restart</button>
  <button on:click={() => (show = !show)}
    >{!show ? 'Show' : 'Hide'} Settings</button
  >
  {#if show}
    <form on:submit|preventDefault={setBoard}>
      <div>
        <label for="board">Board:</label>
        <input id="board" name="board" type="number" value={board} />
      </div>
      <div>
        <label for="mines">Mines:</label>
        <input id="mines" name="mines" type="number" value={bombs} />
      </div>
      <div>
        <label for="cell">Cell Size:</label>
        <input id="cell" name="cell" type="number" value={size} />
      </div>
      <div><button type="submit">SET</button></div>
    </form>
  {/if}

  <div class="status">
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
    {#each cells as cell (cell.key)}
      <Cell
        {cell}
        bind:size
        bind:minesLeft
        bind:gameOver
        bind:won
        bind:cells
        bind:totalClicked
        bind:uncovered
      />
    {/each}
  </div>
  <div>Right click or long press to place flag</div>
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

  label {
    text-align: right;
    width: 75px;
    margin-right: 10px;
  }

  form > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
