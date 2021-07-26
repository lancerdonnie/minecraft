import { nanoid } from 'nanoid';

export const random = (bombs, boardSize) => {
  const numbers = [];

  for (let i = 0; i < bombs; i++) {
    const rand = getRandom(boardSize, numbers);
    numbers.push(rand);
  }

  return numbers;
};

const getRandom = (boardSize, numbers) => {
  const rand = Math.floor(Math.random() * boardSize);
  if (numbers.includes(rand)) {
    return getRandom(boardSize, numbers);
  } else {
    return rand;
  }
};

export const getlocal = (item) => {
  const i = localStorage[item];
  return i ? +i : undefined;
};

export const getAllCells = (bombs, bSize, width) => {
  const numbers = random(bombs, bSize);

  const cells = Array.from(Array(bSize)).map((_, i) => ({
    index: i,
    isBomb: numbers.includes(i),
    value: 0,
    clicked: false,
    flagged: false,
    key: nanoid(),
  }));

  for (let i = 0; i < bSize; i++) {
    //top left
    if (i === 0) {
      cells[i].right = cells[i + 1];
      cells[i].bottom = cells[i + width];
      cells[i].bottomRight = cells[i + 1 + width];
      if (cells[i].isBomb) {
        cells[i].right.value++;
        cells[i].bottom.value++;
        cells[i].bottomRight.value++;
      }
      continue;
    }
    //top right
    if (i === width - 1) {
      cells[i].bottom = cells[i + width];
      cells[i].left = cells[i - 1];
      cells[i].bottomLeft = cells[i - 1 + width];
      if (cells[i].isBomb) {
        cells[i].bottom.value++;
        cells[i].left.value++;
        cells[i].bottomLeft.value++;
      }
      continue;
    }
    // bottom left
    if (i === bSize - width) {
      cells[i].top = cells[i - width];
      cells[i].right = cells[i + 1];
      cells[i].topRight = cells[i + 1 - width];
      if (cells[i].isBomb) {
        cells[i].top.value++;
        cells[i].right.value++;
        cells[i].topRight.value++;
      }
      continue;
    }
    // bottom right
    if (i === bSize - 1) {
      cells[i].top = cells[i - width];
      cells[i].left = cells[i - 1];
      cells[i].topLeft = cells[i - 1 - width];
      if (cells[i].isBomb) {
        cells[i].top.value++;
        cells[i].left.value++;
        cells[i].topLeft.value++;
      }
      continue;
    }

    //top
    if (i < width) {
      cells[i].right = cells[i + 1];
      cells[i].bottom = cells[i + width];
      cells[i].left = cells[i - 1];
      cells[i].bottomRight = cells[i + 1 + width];
      cells[i].bottomLeft = cells[i - 1 + width];
      if (cells[i].isBomb) {
        cells[i].right.value++;
        cells[i].bottom.value++;
        cells[i].left.value++;
        cells[i].bottomRight.value++;
        cells[i].bottomLeft.value++;
      }
      continue;
    }

    //bottom
    if (i >= bSize - width) {
      cells[i].top = cells[i - width];
      cells[i].right = cells[i + 1];
      cells[i].left = cells[i - 1];
      cells[i].topRight = cells[i + 1 - width];
      cells[i].topLeft = cells[i - 1 - width];
      if (cells[i].isBomb) {
        cells[i].top.value++;
        cells[i].right.value++;
        cells[i].left.value++;
        cells[i].topRight.value++;
        cells[i].topLeft.value++;
      }
      continue;
    }

    //left
    if (i % width === 0) {
      cells[i].top = cells[i - width];
      cells[i].right = cells[i + 1];
      cells[i].bottom = cells[i + width];
      cells[i].topRight = cells[i + 1 - width];
      cells[i].bottomRight = cells[i + 1 + width];
      if (cells[i].isBomb) {
        cells[i].top.value++;
        cells[i].right.value++;
        cells[i].bottom.value++;
        cells[i].topRight.value++;
        cells[i].bottomRight.value++;
      }
      continue;
    }

    //right
    if ((i + 1) % width === 0) {
      cells[i].top = cells[i - width];
      cells[i].bottom = cells[i + width];
      cells[i].left = cells[i - 1];
      cells[i].bottomLeft = cells[i - 1 + width];
      cells[i].topLeft = cells[i - 1 - width];
      if (cells[i].isBomb) {
        cells[i].top.value++;
        cells[i].bottom.value++;
        cells[i].left.value++;
        cells[i].bottomLeft.value++;
        cells[i].topLeft.value++;
      }
      continue;
    }

    // any
    cells[i].top = cells[i - width];
    cells[i].right = cells[i + 1];
    cells[i].bottom = cells[i + width];
    cells[i].left = cells[i - 1];
    cells[i].topRight = cells[i + 1 - width];
    cells[i].bottomRight = cells[i + 1 + width];
    cells[i].bottomLeft = cells[i - 1 + width];
    cells[i].topLeft = cells[i - 1 - width];
    if (cells[i].isBomb) {
      cells[i].top.value++;
      cells[i].right.value++;
      cells[i].bottom.value++;
      cells[i].left.value++;
      cells[i].topRight.value++;
      cells[i].bottomRight.value++;
      cells[i].bottomLeft.value++;
      cells[i].topLeft.value++;
    }
  }

  return cells;
};
