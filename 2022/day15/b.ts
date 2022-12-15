const input = await Deno.readTextFile('./input.txt');
const sensors_raw = input.split(/\r?\n/);
const sensors_data = sensors_raw.map((sensor) => sensor.match(/\-?\d+/g)!.map(Number));

const mhd = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

let x = 0;
let y = 0;

while (true) {
  if (x > 4000000 && y > 4000000) break;

  const sensor = sensors_data.find(([sX, sY, bX, bY]) => mhd(sX, sY, bX, bY) >= mhd(x, y, sX, sY));

  if (!sensor) {
    console.log('found something', x, y, 'freq:', x * 4000000 + y);
    break;
  }

  const [sX, sY, bX, bY] = sensor;

  const sensorRange = mhd(sX, sY, bX, bY);
  const mhdToSensor = mhd(x, y, sX, sY);
  const skippedXSteps = sensorRange - mhdToSensor + 1;

  const nextX = x + skippedXSteps;
  x = nextX > 4000000 ? 0 : nextX;
  y = nextX > 4000000 ? y + 1 : y;
}
