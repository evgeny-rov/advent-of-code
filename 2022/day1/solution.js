import * as fs from 'fs';

fs.readFile('./input.txt', (_, data) => {
  const [first, second, third] = String(data)
    .split(/\r?\n\r?\n/)
    .map((elfEntry) => elfEntry.split(/\r?\n/).reduce((acc, value) => Number(value) + acc, 0))
    .sort((a, b) => b - a);

  console.log(first);
  console.log(first + second + third);
});
