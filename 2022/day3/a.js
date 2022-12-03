const fs = require('fs');

fs.readFile('./input copy.txt', (_, data) => {
  const lines = String(data)
    .split(/\r?\n/)
    .map((line) => line.split(''));

  const result = lines
    .map((line) =>
      line.slice(0, line.length / 2).filter((char) => line.slice(line.length / 2).includes(char))
    )
    .map((repeats) => Array.from(new Set(repeats)).join(''))
    .map((char) => (char.charCodeAt(0) >= 97 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38))
    .reduce((a, b) => a + b, 0);

  console.log(result);
});
