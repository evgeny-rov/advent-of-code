const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const input = String(data);
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const chunk = input.slice(i, i + 14);
    const uniqueChars = new Set(chunk);

    if (uniqueChars.size === 14) {
      result = i + 14;
      break;
    }
  }

  console.log(result);
});
