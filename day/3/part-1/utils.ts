const digitRegex = /\d/;
const symbolRegex = /[^\d\.a-zA-Z]/;

export function run(input: string): number {
  // Split input string into array of string rows
  const array = input.split(/\n/);

  let sum = 0;

  // Process the array by iterating over every character.
  for (let y = 0; y < array.length; y++) {
    let numStr = "";
    let numStartX = 0;

    for (let x = 0; x < array[y].length; x++) {
      const char = array[y][x];
      if (digitRegex.test(char)) {
        if (!numStr.length) numStartX = x;
        numStr += char;
      }

      // If we've reached the end of the number, then process it.
      if (
        (!digitRegex.test(char) || x === array[y].length - 1) &&
        numStr.length
      ) {
        let hasAdjacentSymbol = false;

        for (let cy = y - 1; cy <= y + 1; cy++) {
          if (hasAdjacentSymbol) break;
          if (cy < 0 || cy >= array.length) continue;

          for (let cx = numStartX - 1; cx <= numStartX + numStr.length; cx++) {
            if (hasAdjacentSymbol) break;
            if (cx < 0 || cx >= array[cy].length) continue;

            if (symbolRegex.test(array[cy][cx])) hasAdjacentSymbol = true;
          }
        }

        if (hasAdjacentSymbol) {
          sum += parseInt(numStr);
        }

        // Cleanup
        numStr = "";
        numStartX = 0;
      }
    }
  }

  return sum;
}
