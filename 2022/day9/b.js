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

fs.readFile('./input.txt', (_, data) => {
  const moves = String(data).split(/\r?\n/);

  let rope = Array(10)
    .fill(null)
    .map(() => [0, 0]);

  const tailVisitedPositions = new Set();

  for (const move of moves) {
    const [dir, steps] = move.split(' ');

    for (let i = Number(steps); i > 0; i--) {
      rope[0] = nextHeadPos(rope[0], dir);

      for (let i = 0; i < rope.length - 1; i++) {
        let dx = rope[i][0] - rope[i + 1][0];
        let dy = rope[i][1] - rope[i + 1][1];

        if (Math.abs(dx) > 1) {
          rope[i + 1][0] += dx > 0 ? 1 : -1;
          if (Math.abs(dy) != 0) rope[i + 1][1] += dy > 0 ? 1 : -1;
        } else if (Math.abs(dy) > 1) {
          rope[i + 1][1] += dy > 0 ? 1 : -1;
          if (Math.abs(dx) != 0) rope[i + 1][0] += dx > 0 ? 1 : -1;
        }
      }

      tailVisitedPositions.add(rope[rope.length - 1].join(','));
    }
  }

  console.log(tailVisitedPositions.size);
});
