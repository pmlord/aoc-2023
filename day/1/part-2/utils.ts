const dictionary = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const speltNumbers: string[] = Object.keys(dictionary);

export const numberRegexp = new RegExp(`[0-9]|${speltNumbers.join("|")}`, "ig");

export function parseDigitOrSpeltNumber(input: string): number {
  const parsedInt = parseInt(input);
  if (Number.isInteger(parsedInt)) return parsedInt;

  if (input in dictionary) {
    return dictionary[input as keyof typeof dictionary];
  }

  return NaN;
}

export function extractCalibrationNumber(input: string): number {
  const matches = input.match(numberRegexp);
  if (!matches) throw "no matches";

  console.log("matches", matches);

  const firstDigit = parseDigitOrSpeltNumber(matches[0]);
  const secondDigit = parseDigitOrSpeltNumber(matches[matches.length - 1]);

  if (!Number.isInteger(firstDigit) || !Number.isInteger(secondDigit))
    throw "Input must have 2 digits.";

  // Combine the two into a two-digit number
  return firstDigit * 10 + secondDigit;
}

export async function textFileToArray(fileName: string): Promise<string[]> {
  // Get the puzzle input
  const text = await Deno.readTextFile(fileName);
  return text.split("\n").filter((str) => str !== "");
}
