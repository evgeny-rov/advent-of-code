const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const groups = String(data).match(/(?=[\s\S])(?:.*\r?\n?){1,3}/g);

  const result = groups
    .map((group) => group.split(/\r?\n/))
    .map((lines) =>
      lines[0].split('').filter((char) => lines[1].includes(char) && lines[2].includes(char))
    )
    .map((repeats) => Array.from(new Set(repeats)).join(''))
    .map((char) => (char.charCodeAt(0) >= 97 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38))
    .reduce((a, b) => a + b, 0);

  console.log(result);
});
