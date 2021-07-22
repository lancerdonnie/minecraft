<script>
  export let cell;
  export let cells;
  export let minesLeft;
  export let gameOver;
  export let won;
  export let board;
  export let boardSize;

  let flagged = false;

  const handleEmptySpace = (i) => {
    cells[i].clicked = true;
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
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!bottom.isBomb && !bottom.value && !bottom.clicked)
        handleEmptySpace(bottom.index);
      if (!bottomRight.isBomb && !bottomRight.value && !bottomRight.clicked)
        handleEmptySpace(bottomRight.index);
      return;
    }
    //top right
    if (i === board - 1) {
      if (!left.isBomb && !left.value && !left.clicked)
        handleEmptySpace(left.index);
      if (!bottom.isBomb && !bottom.value && !bottom.clicked)
        handleEmptySpace(bottom.index);
      if (!bottomLeft.isBomb && !bottomLeft.value && !bottomLeft.clicked)
        handleEmptySpace(bottomLeft.index);
      return;
    }
    //   // bottom left
    if (i === boardSize - board) {
      if (!top.isBomb && !top.value && !top.clicked)
        handleEmptySpace(top.index);
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!topRight.isBomb && !topRight.value && !topRight.clicked)
        handleEmptySpace(topRight.index);
      return;
    }
    // bottom right
    if (i === boardSize - 1) {
      if (!top.isBomb && !top.value && !top.clicked)
        handleEmptySpace(top.index);
      if (!left.isBomb && !left.value && !left.clicked)
        handleEmptySpace(left.index);
      if (!topLeft.isBomb && !topLeft.value && !topLeft.clicked)
        handleEmptySpace(topLeft.index);
      return;
    }
    //top
    if (i < board) {
      if (!bottom.isBomb && !bottom.value && !bottom.clicked)
        handleEmptySpace(bottom.index);
      if (!left.isBomb && !left.value && !left.clicked)
        handleEmptySpace(left.index);
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!bottomLeft.isBomb && !bottomLeft.value && !bottomLeft.clicked)
        handleEmptySpace(bottomLeft.index);
      if (!bottomRight.isBomb && !bottomRight.value && !bottomRight.clicked)
        handleEmptySpace(bottomRight.index);
      return;
    }
    //bottom
    if (i >= boardSize - board) {
      if (!top.isBomb && !top.value && !top.clicked)
        handleEmptySpace(top.index);
      if (!left.isBomb && !left.value && !left.clicked)
        handleEmptySpace(left.index);
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!topLeft.isBomb && !topLeft.value && !topLeft.clicked)
        handleEmptySpace(topLeft.index);
      if (!topRight.isBomb && !topRight.value && !topRight.clicked)
        handleEmptySpace(topRight.index);
      return;
    }
    //left
    if (i % board === 0) {
      if (!top.isBomb && !top.value && !top.clicked)
        handleEmptySpace(top.index);
      if (!bottom.isBomb && !bottom.value && !bottom.clicked)
        handleEmptySpace(bottom.index);
      if (!right.isBomb && !right.value && !right.clicked)
        handleEmptySpace(right.index);
      if (!bottomRight.isBomb && !bottomRight.value && !bottomRight.clicked)
        handleEmptySpace(bottomRight.index);
      if (!topRight.isBomb && !topRight.value && !topRight.clicked)
        handleEmptySpace(topRight.index);
      return;
    }
    //right
    if ((i + 1) % board === 0) {
      if (!top.isBomb && !top.value && !top.clicked)
        handleEmptySpace(top.index);
      if (!bottom.isBomb && !bottom.value && !bottom.clicked)
        handleEmptySpace(bottom.index);
      if (!left.isBomb && !left.value && !left.clicked)
        handleEmptySpace(left.index);
      if (!topLeft.isBomb && !topLeft.value && !topLeft.clicked)
        handleEmptySpace(topLeft.index);
      if (!bottomLeft.isBomb && !bottomLeft.value && !bottomLeft.clicked)
        handleEmptySpace(bottomLeft.index);
      return;
    }
    // any
    if (!top.isBomb && !top.value && !top.clicked) handleEmptySpace(top.index);
    if (!bottom.isBomb && !bottom.value && !bottom.clicked)
      handleEmptySpace(bottom.index);
    if (!left.isBomb && !left.value && !left.clicked)
      handleEmptySpace(left.index);
    if (!right.isBomb && !right.value && !right.clicked)
      handleEmptySpace(right.index);
    if (!bottomRight.isBomb && !bottomRight.value && !bottomRight.clicked)
      handleEmptySpace(bottomRight.index);
    if (!topRight.isBomb && !topRight.value && !topRight.clicked)
      handleEmptySpace(topRight.index);
    if (!topLeft.isBomb && !topLeft.value && !topLeft.clicked)
      handleEmptySpace(topLeft.index);
    if (!bottomLeft.isBomb && !bottomLeft.value && !bottomLeft.clicked)
      handleEmptySpace(bottomLeft.index);
  };

  const handleClick = () => {
    cell.clicked = true;

    if (cell.isBomb) {
      flagged = true;
      gameOver = true;
      //reveal all mines
      return;
    }
    if (
      cells.every(({ isBomb, clicked }) => (!isBomb && clicked ? true : false))
    ) {
      gameOver = true;
      won = true;
      return;
    }
    if (!cell.value) {
      handleEmptySpace(cell.index);
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
  class:flagged
  class:clicked={cell.clicked}
>
  {(() => {
    if (cell.isBomb) return '';
    if (cell.clicked) return cell.value || '';
    return '';
    // return cell.value || '';
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
</style>
