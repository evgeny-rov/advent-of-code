const input = await Deno.readTextFile('./input.txt');
const sensors_raw = input.split(/\r?\n/);
const sensors_data = sensors_raw.map((sensor) => sensor.match(/\-?\d+/g)!.map(Number));

const mhd = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const boundaries = sensors_data.reduce(
  (acc, [sX, sY, bX, bY]) => {
    const sensorRange = mhd(sX, sY, bX, bY);
    acc.minX = Math.min(acc.minX, sX - sensorRange, bX);
    acc.maxX = Math.max(acc.maxX, sX + sensorRange, bX);
    return acc;
  },
  { minX: Infinity, maxX: 0 }
);

let impossiblePositions = 0;
const y = 2000000;

for (let x = boundaries.minX; x <= boundaries.maxX; x++) {
  for (const [sX, sY, bX, bY] of sensors_data) {
    if (x === bX && y === bY) continue;
    const sensorRange = mhd(sX, sY, bX, bY);

    const isInRange = mhd(x, y, sX, sY) <= sensorRange;

    if (isInRange) {
      impossiblePositions++;
      break;
    }
  }
}

console.log(impossiblePositions);
