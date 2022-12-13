const fs = require('fs');

const heurestic = (node) => {
  if (node.val === 'S') {
    return 26;
  } else if (node.val === 'E') {
    return 0;
  }

  return 123 - node.val.charCodeAt(0);
};

const getNeighbors = (grid, node) => {
  const connectedCells = [
    [node.x - 1, node.y],
    [node.x, node.y - 1],
    [node.x + 1, node.y],
    [node.x, node.y + 1],
  ];

  const validCells = connectedCells.filter(
    (cell) => cell[0] >= 0 && cell[0] < grid.length && cell[1] >= 0 && cell[1] < grid[0].length
  );

  return validCells
    .filter(([r, c]) => heurestic(node) - heurestic(grid[r][c]) <= 1)
    .map(([x, y]) => grid[x][y]);
};

const findSmallest = (dict) => {
  return [...dict.values()].reduce((smlst, curr) => (curr.f < smlst.f ? curr : smlst), {
    f: Infinity,
  });
};

const findShortest = (grid, start, end) => {
  const openSet = new Set();
  openSet.add(start);

  while (openSet.size > 0) {
    const current = findSmallest(openSet);
    openSet.delete(current);

    if (current.val === end.val) return current.g;

    for (const neighbor of getNeighbors(grid, current)) {
      const tempGScore = current.g + 1;
      if (tempGScore < neighbor.g) {
        neighbor.g = tempGScore;
        neighbor.f = tempGScore + heurestic(neighbor);

        if (!openSet.has(neighbor)) openSet.add(neighbor);
      }
    }
  }

  return null;
};

fs.readFile('./input.txt', (_, data) => {
  const grid = String(data)
    .split(/\r?\n/)
    .map((line, x) =>
      line.split('').map((val, y) => ({ val, x, y, f: 0, g: val === 'S' ? 0 : Infinity }))
    );

  const start = grid.reduce((found, row) => row.find((node) => node.val === 'S') ?? found, null);
  const end = grid.reduce((found, row) => row.find((node) => node.val === 'E') ?? found, null);

  const result = findShortest(grid, start, end);
  console.log(result);
});
