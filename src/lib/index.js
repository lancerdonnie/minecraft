import { nanoid } from 'nanoid';
import testData from './testData';
let f = false;

export const getCells = (bombs, boardSize) => {
  const numbers = random(bombs, boardSize);
  const cells = Array.from(Array(boardSize)).map((_, i) => {
    return {
      index: i,
      isBomb: numbers.includes(i),
      value: 0,
      clicked: false,
      key: nanoid(),
    };
  });

  if (!f) return cells;
  f = true;
  return testData;
};

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
