import * as path from "https://deno.land/std@0.208.0/path/mod.ts";

// Utility functions
// -----------------------------------------------------------------------------

export function extractCalibrationNumber(input: string): number {
  // Extract the first and last numbers from the string.
  let firstDigit: number | undefined = undefined;
  let secondDigit: number | undefined = undefined;

  // Extract the first number
  for (let i = 0; i < input.length; i++) {
    const candidate = parseInt(input[i]);
    if (Number.isInteger(candidate)) {
      firstDigit = candidate;
      break;
    }
  }

  // Extract the last number
  for (let i = input.length - 1; i >= 0; i--) {
    const candidate = parseInt(input[i]);
    if (Number.isInteger(candidate)) {
      secondDigit = candidate;
      break;
    }
  }

  if (firstDigit === undefined || secondDigit === undefined)
    throw "Input must have 2 digits.";

  // Combine the two into a two-digit number
  return firstDigit * 10 + secondDigit;
}

export async function textFileToArray(fileName: string): Promise<string[]> {
  // Get the puzzle input
  const text = await Deno.readTextFile(fileName);
  return text.split("\n").filter((str) => str !== "");
}

// Script
// -----------------------------------------------------------------------------

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const array = await textFileToArray(`${__dirname}/input.txt`);

let sum = 0;

for (const str of array) {
  const number: number = extractCalibrationNumber(str);
  sum += number;
}

console.log(`Answer is: ${sum}`);
