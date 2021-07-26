<script>
  export let cell;
  export let cells;
  export let minesLeft;
  export let gameOver;
  export let won;
  export let totalClicked;
  export let uncovered;
  export let size;

  let flagged = false;
  let badFlag = null;

  const handleEmptySpace = (i) => {
    if (!cells[i]) return;
    if (cells[i].clicked) return;

    cells[i].clicked = true;
    uncovered++;

    if (cells[i].value || cells[i].isBomb) return;

    handleEmptySpace(cells[i]?.top?.index);
    handleEmptySpace(cells[i]?.bottom?.index);
    handleEmptySpace(cells[i]?.left?.index);
    handleEmptySpace(cells[i]?.right?.index);
    handleEmptySpace(cells[i]?.bottomRight?.index);
    handleEmptySpace(cells[i]?.topRight?.index);
    handleEmptySpace(cells[i]?.topLeft?.index);
    handleEmptySpace(cells[i]?.bottomLeft?.index);
  };

  const handleClick = () => {
    if (cell.isBomb) {
      gameOver = true;
      badFlag = cell.index;
      return;
    }
    if (!cell.value) {
      handleEmptySpace(cell.index);
    } else {
      cell.clicked = true;
      uncovered++;
    }

    if (uncovered >= totalClicked) {
      gameOver = true;
      won = true;
    }
  };

  const handleContextClick = () => {
    if (cell.clicked) return;
    flagged = !flagged;
    if (flagged) minesLeft--;
    else minesLeft++;
  };
</script>

<div
  on:click|once={handleClick}
  on:contextmenu|preventDefault={handleContextClick}
  class="cell"
  class:clicked={cell.clicked}
  class:badFlag
  style="--size:{size}px"
>
  {(() => {
    if (cell.isBomb) return '';
    if (cell.clicked) return cell.value || '';
    return '';
    // return cell.value;
  })()}
  <img
    alt="flag"
    src="flag.png"
    class:flagged={(flagged || (gameOver && cell.isBomb)) && !badFlag}
  />
  <img alt="mine" src="mine.png" class:badFlag />
</div>

<style>
  img {
    height: 100%;
    width: 100%;
    display: none;
  }
  .cell {
    background-color: #808080;
    border: #eee 1px solid;
    width: var(--size);
    height: var(--size);
    cursor: pointer;
  }
  .clicked {
    background-color: white;
  }
  .flagged {
    display: initial;
  }
  .badFlag {
    display: initial;
    position: relative;
  }
</style>
