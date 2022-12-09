const fs = require('fs');

const nextHeadPos = (head, dir) => {
  if (dir === 'U') {
    return [head[0], head[1] + 1];
  } else if (dir === 'D') {
    return [head[0], head[1] - 1];
  } else if (dir === 'R') {
    return [head[0] + 1, head[1]];
  } else if (dir === 'L') {
    return [head[0] - 1, head[1]];
  }
};

const isAdjacent = ([x1, y1], [x2, y2]) => {
  return Math.abs(x1 - x2) < 2 && Math.abs(y1 - y2) < 2;
};

fs.readFile('./input.txt', (_, data) => {
  const moves = String(data).split(/\r?\n/);

  let head = [0, 0];
  let tail = [0, 0];
  const tailVisitedPositions = new Set();

  for (const move of moves) {
    const [dir, steps] = move.split(' ');

    for (let i = Number(steps); i > 0; i--) {
      let prevHead = [...head];
      head = nextHeadPos(head, dir);

      if (!isAdjacent(tail, head)) tail = prevHead;

      tailVisitedPositions.add(tail.join(','));
    }
  }

  console.log(tailVisitedPositions.size);
});
