<script>
  export let cell;
  export let cells;
  export let minesLeft;
  export let gameOver;
  export let won;
  export let totalClicked;
  export let uncovered;
  export let size;

  let badFlag = null;

  const incrementClick = (cell) => {
    cell.clicked = true;
    uncovered++;
    cells = cells;
  };

  const handleEmptySpace = (i) => {
    if (!cells[i]) return;
    if (cells[i].clicked) return;

    incrementClick(cells[i]);

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

  const handleClickedValue = (i) => {
    const top = cells[i]?.top;
    const bottom = cells[i]?.bottom;
    const left = cells[i]?.left;
    const right = cells[i]?.right;
    const bottomRight = cells[i]?.bottomRight;
    const topRight = cells[i]?.topRight;
    const topLeft = cells[i]?.topLeft;
    const bottomLeft = cells[i]?.bottomLeft;

    if (top && !top.isBomb) {
      if (!top.value) handleEmptySpace(top.index);
      else incrementClick(top);
    }
    if (bottom && !bottom.isBomb) {
      if (!bottom.value) handleEmptySpace(bottom.index);
      else incrementClick(bottom);
    }
    if (left && !left.isBomb) {
      if (!left.value) handleEmptySpace(left.index);
      else incrementClick(left);
    }
    if (right && !right.isBomb) {
      if (!right.value) handleEmptySpace(right.index);
      else incrementClick(right);
    }
    if (bottomRight && !bottomRight.isBomb) {
      if (!bottomRight.value) handleEmptySpace(bottomRight.index);
      else incrementClick(bottomRight);
    }
    if (topRight && !topRight.isBomb) {
      if (!topRight.value) handleEmptySpace(topRight.index);
      else incrementClick(topRight);
    }
    if (topLeft && !topLeft.isBomb) {
      if (!topLeft.value) handleEmptySpace(topLeft.index);
      else incrementClick(topLeft);
    }
    if (bottomLeft && !bottomLeft.isBomb) {
      if (!bottomLeft.value) handleEmptySpace(bottomLeft.index);
      else incrementClick(bottomLeft);
    }
  };

  const handleNumberClicked = () => {
    const val = [
      cell?.top?.flagged,
      cell?.bottom?.flagged,
      cell?.left?.flagged,
      cell?.right?.flagged,
      cell?.bottomRight?.flagged,
      cell?.topRight?.flagged,
      cell?.topLeft?.flagged,
      cell?.bottomLeft?.flagged,
    ].filter(Boolean).length;

    if (cell.value !== val) return;
    handleClickedValue(cell.index);
  };

  const handleClick = () => {
    if (cell.isBomb) {
      gameOver = true;
      badFlag = cell.index;
      return;
    }
    if (cell.clicked) {
      handleNumberClicked();
    } else if (!cell.value) {
      handleEmptySpace(cell.index);
    } else {
      incrementClick(cell);
    }

    if (uncovered >= totalClicked) {
      gameOver = true;
      won = true;
    }
  };

  const handleContextClick = () => {
    if (cell.clicked) return;
    cell.flagged = !cell.flagged;
    if (cell.flagged) minesLeft--;
    else minesLeft++;
  };
</script>

<div
  on:click={handleClick}
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
    class:flagged={(cell.flagged || (gameOver && cell.isBomb)) && !badFlag}
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
