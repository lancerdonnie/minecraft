<script>
  export let cell;
  export let cells;
  export let minesLeft;
  export let gameOver;
  export let won;
  export let board;
  export let boardSize;

  let flagged = false;
  let badFlag = null;

  const handleEmptySpace = (i) => {
    cells[i].clicked = true;
    if (cells[i].value) return;
    if (cells[i].isBomb) return;
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
      if (!right.clicked) handleEmptySpace(right.index);
      if (!right.clicked) handleEmptySpace(right.index);
      if (!bottom.clicked) handleEmptySpace(bottom.index);
      if (!bottomRight.clicked) handleEmptySpace(bottomRight.index);
      return;
    }
    //top right
    if (i === board - 1) {
      if (!left.clicked) handleEmptySpace(left.index);
      if (!bottom.clicked) handleEmptySpace(bottom.index);
      if (!bottomLeft.clicked) handleEmptySpace(bottomLeft.index);
      return;
    }
    //   // bottom left
    if (i === boardSize - board) {
      if (!top.clicked) handleEmptySpace(top.index);
      if (!right.clicked) handleEmptySpace(right.index);
      if (!topRight.clicked) handleEmptySpace(topRight.index);
      return;
    }
    // bottom right
    if (i === boardSize - 1) {
      if (!top.clicked) handleEmptySpace(top.index);
      if (!left.clicked) handleEmptySpace(left.index);
      if (!topLeft.clicked) handleEmptySpace(topLeft.index);
      return;
    }
    //top
    if (i < board) {
      if (!bottom.clicked) handleEmptySpace(bottom.index);
      if (!left.clicked) handleEmptySpace(left.index);
      if (!right.clicked) handleEmptySpace(right.index);
      if (!bottomLeft.clicked) handleEmptySpace(bottomLeft.index);
      if (!bottomRight.clicked) handleEmptySpace(bottomRight.index);
      return;
    }
    //bottom
    if (i >= boardSize - board) {
      if (!top.clicked) handleEmptySpace(top.index);
      if (!left.clicked) handleEmptySpace(left.index);
      if (!right.clicked) handleEmptySpace(right.index);
      if (!topLeft.clicked) handleEmptySpace(topLeft.index);
      if (!topRight.clicked) handleEmptySpace(topRight.index);
      return;
    }
    //left
    if (i % board === 0) {
      if (!top.clicked) handleEmptySpace(top.index);
      if (!bottom.clicked) handleEmptySpace(bottom.index);
      if (!right.clicked) handleEmptySpace(right.index);
      if (!bottomRight.clicked) handleEmptySpace(bottomRight.index);
      if (!topRight.clicked) handleEmptySpace(topRight.index);
      return;
    }
    //right
    if ((i + 1) % board === 0) {
      if (!top.clicked) handleEmptySpace(top.index);
      if (!bottom.clicked) handleEmptySpace(bottom.index);
      if (!left.clicked) handleEmptySpace(left.index);
      if (!topLeft.clicked) handleEmptySpace(topLeft.index);
      if (!bottomLeft.clicked) handleEmptySpace(bottomLeft.index);
      return;
    }
    // any
    !top.clicked && handleEmptySpace(top.index);
    !bottom.clicked && handleEmptySpace(bottom.index);
    !left.clicked && handleEmptySpace(left.index);
    !right.clicked && handleEmptySpace(right.index);
    !bottomRight.clicked && handleEmptySpace(bottomRight.index);
    !topRight.clicked && handleEmptySpace(topRight.index);
    !topLeft.clicked && handleEmptySpace(topLeft.index);
    !bottomLeft.clicked && handleEmptySpace(bottomLeft.index);
  };

  const handleClick = () => {
    if (cell.isBomb) {
      flagged = true;
      gameOver = true;
      badFlag = cell.index;
      return;
    }
    if (!cell.value) {
      handleEmptySpace(cell.index);
    } else {
      cell.clicked = true;
    }

    const wonGame = cells.every(({ isBomb, clicked }) => isBomb || clicked);

    if (wonGame) {
      gameOver = true;
      won = true;
      return;
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
  class:flagged={flagged || (gameOver && cell.isBomb)}
  class:clicked={cell.clicked}
  class:badFlag
>
  {(() => {
    if (cell.isBomb) return '';
    if (cell.clicked) return cell.value || '';
    return '';
  })()}
</div>

<style>
  .cell {
    background-color: gray;
    border: #eee 1px solid;
    width: 30px;
    height: 30px;
  }
  .clicked {
    background-color: white;
  }
  .flagged {
    background-color: red;
  }
  .badFlag {
    background-color: yellow;
  }
</style>
