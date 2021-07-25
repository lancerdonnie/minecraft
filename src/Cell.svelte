<script>
  export let cell;
  export let cells;
  export let minesLeft;
  export let gameOver;
  export let won;
  export let board;
  export let boardSize;
  export let totalClicked;
  export let uncovered;

  let flagged = false;
  let badFlag = null;

  const handleEmptySpace = (i) => {
    if (cells[i].clicked) return;

    cells[i].clicked = true;
    uncovered++;

    if (cells[i].value || cells[i].isBomb) return;

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
      handleEmptySpace(right.index);
      handleEmptySpace(right.index);
      handleEmptySpace(bottom.index);
      handleEmptySpace(bottomRight.index);
      return;
    }
    //top right
    if (i === board - 1) {
      handleEmptySpace(left.index);
      handleEmptySpace(bottom.index);
      handleEmptySpace(bottomLeft.index);
      return;
    }
    //   // bottom left
    if (i === boardSize - board) {
      handleEmptySpace(top.index);
      handleEmptySpace(right.index);
      handleEmptySpace(topRight.index);
      return;
    }
    // bottom right
    if (i === boardSize - 1) {
      handleEmptySpace(top.index);
      handleEmptySpace(left.index);
      handleEmptySpace(topLeft.index);
      return;
    }
    //top
    if (i < board) {
      handleEmptySpace(bottom.index);
      handleEmptySpace(left.index);
      handleEmptySpace(right.index);
      handleEmptySpace(bottomLeft.index);
      handleEmptySpace(bottomRight.index);
      return;
    }
    //bottom
    if (i >= boardSize - board) {
      handleEmptySpace(top.index);
      handleEmptySpace(left.index);
      handleEmptySpace(right.index);
      handleEmptySpace(topLeft.index);
      handleEmptySpace(topRight.index);
      return;
    }
    //left
    if (i % board === 0) {
      handleEmptySpace(top.index);
      handleEmptySpace(bottom.index);
      handleEmptySpace(right.index);
      handleEmptySpace(bottomRight.index);
      handleEmptySpace(topRight.index);
      return;
    }
    //right
    if ((i + 1) % board === 0) {
      handleEmptySpace(top.index);
      handleEmptySpace(bottom.index);
      handleEmptySpace(left.index);
      handleEmptySpace(topLeft.index);
      handleEmptySpace(bottomLeft.index);
      return;
    }
    // any
    handleEmptySpace(top.index);
    handleEmptySpace(bottom.index);
    handleEmptySpace(left.index);
    handleEmptySpace(right.index);
    handleEmptySpace(bottomRight.index);
    handleEmptySpace(topRight.index);
    handleEmptySpace(topLeft.index);
    handleEmptySpace(bottomLeft.index);
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
    width: 30px;
    height: 30px;
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
