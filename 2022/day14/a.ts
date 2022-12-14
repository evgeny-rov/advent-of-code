const input = await Deno.readTextFile('./input.txt');
const paths = input
  .split(/\r?\n/)
  .map((path) => path.split(' -> ').map((pos) => pos.split(',').map(Number)));

const getPointsBetween = (start: number[], [endX, endY]: number[]) => {
  let x = start[0];
  let y = start[1];

  const result = [start];

  while (x !== endX || y !== endY) {
    const nextX = x > endX ? x - 1 : x < endX ? x + 1 : x;
    const nextY = y > endY ? y - 1 : y < endY ? y + 1 : y;

    result.push([nextX, nextY]);
    x = nextX;
    y = nextY;
  }

  return result;
};

const createMap = (paths: number[][][]) => {
  const map: string[][] = Array(600)
    .fill(null)
    .map(() => Array(600).fill('.'));

  for (const path of paths) {
    for (let i = 0; i < path.length; i++) {
      const start = path[i];
      const end = path[i + 1];

      if (!end) break;

      getPointsBetween(start, end).forEach(([x, y]) => {
        map[y][x] = '#';
      });
    }
  }

  return map;
};

const simulate = (map: string[][], eventHorizon: number) => {
  const sandSource = [500, 0];
  let particle = [...sandSource];
  let settled = 0;

  while (true) {
    const [x, y] = particle;

    if (y === eventHorizon) return settled;

    const below = [x, y + 1];
    const lb = [x - 1, y + 1];
    const rb = [x + 1, y + 1];

    const unoccupiedTile = [below, lb, rb].find(([y, x]) => map[x][y] === '.');

    if (unoccupiedTile) {
      const [uy, ux] = unoccupiedTile;
      map[y][x] = '.';
      map[ux][uy] = 'O';
      particle = unoccupiedTile;
    } else {
      settled++;
      particle = [...sandSource];
    }
  }
};

const eventHorizon = Math.max(...paths.flat().map(([, y]) => y)) + 1;
const map = createMap(paths);
const result = simulate(map, eventHorizon);
await Deno.writeTextFile('output-part1.txt', map.map((row) => row.join('')).join('\n'));
console.log(result);
