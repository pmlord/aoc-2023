const digitRegex = /\d/;

export function run(input: string): number {
  // Split input string into array of string rows
  const array = input.split(/\n/);

  let sum = 0;

  // Process the array by iterating over every character.
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      // If there's a star, begin looking for numbers.
      if (array[y][x] === "*") {
        const visitedPostitions: [number, number][] = [];
        const numbers: number[] = [];

        // Search the surrounding area for a number.
        for (let cy = y - 1; cy <= y + 1; cy++) {
          if (cy < 0 || cy >= array.length) continue;
          for (let cx = x - 1; cx <= x + 1; cx++) {
            if (cx < 0 || cx >= array[cy].length) continue;
            if (visitedPostitions.some((pos) => pos[0] === cy && pos[1] === cx))
              continue;

            visitedPostitions.push([cy, cx]);

            if (digitRegex.test(array[cy][cx])) {
              let numStart = cx;

              // Reverse until we find the start of the number
              while (true) {
                visitedPostitions.push([cy, numStart]);
                if (numStart > 0 && digitRegex.test(array[cy][numStart - 1])) {
                  numStart--;
                  continue;
                } else {
                  break;
                }
              }

              // Forward until we find the end of the number
              let numStr = "";
              for (let i = numStart; i < array[cy].length; i++) {
                visitedPostitions.push([cy, i]);
                const char = array[cy][i];
                if (digitRegex.test(char)) {
                  numStr += char;
                } else {
                  break;
                }
              }

              // Record the number
              const number = parseInt(numStr);
              if (!Number.isInteger(number)) throw "uh oh...";
              numbers.push(number);
            }
          }
        }

        if (numbers.length >= 2) {
          const product = numbers.reduce((accum, num, i) => {
            if (i === 0) return num;
            return accum * num;
          }, 0);

          sum += product;
        }
      }
    }
  }

  return sum;
}
