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

const findSmallest = (dict, fScores) => {
  let smallest = null;

  dict.forEach((current) => {
    if (fScores.get(current) < (fScores.get(smallest) ?? Infinity)) {
      smallest = current;
    }
  });

  return smallest;
};

const findShortest = (grid, start, end) => {
  const openSet = new Set();
  const gScore = new Map();
  const fScore = new Map();

  gScore.set(start, 0);
  fScore.set(start, heurestic(start));
  openSet.add(start);

  while (openSet.size > 0) {
    const current = findSmallest(openSet, fScore);
    openSet.delete(current);

    if (current.val === end.val) return gScore.get(current);

    for (const neighbor of getNeighbors(grid, current)) {
      const tempGScore = gScore.get(current) + 1;
      if (tempGScore < (gScore.get(neighbor) ?? Infinity)) {
        gScore.set(neighbor, tempGScore);
        fScore.set(neighbor, tempGScore + heurestic(neighbor));

        if (!openSet.has(neighbor)) openSet.add(neighbor);
      }
    }
  }

  return null;
};

fs.readFile('./input.txt', (_, data) => {
  const grid = String(data)
    .split(/\r?\n/)
    .map((line, x) => line.split('').map((val, y) => ({ val: val === 'S' ? 'a' : val, x, y })));

  const lowestPoints = grid.reduce(
    (res, row) => [...res, ...row.filter((node) => node.val === 'a')],
    []
  );
  const end = grid.reduce((found, row) => row.find((node) => node.val === 'E') ?? found, null);

  const paths = lowestPoints
    .map((lowestPoint) => findShortest(grid, lowestPoint, end))
    .filter((node) => node);

  console.log(paths.sort((b, a) => b - a)[0]);
});
