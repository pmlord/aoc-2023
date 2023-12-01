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

const reverseSpeltNumbers = speltNumbers.map((str) => reverseString(str));
export const reverseNumberRegexp = new RegExp(
  `[0-9]|${reverseSpeltNumbers.join("|")}`,
  "ig"
);

export function parseDigitOrSpeltNumber(input: string): number {
  const parsedInt = parseInt(input);
  if (Number.isInteger(parsedInt)) return parsedInt;

  if (input in dictionary) {
    return dictionary[input as keyof typeof dictionary];
  }

  return NaN;
}

export function extractCalibrationNumber(input: string): number {
  // First number
  const forwardMathces = input.match(numberRegexp);
  if (!forwardMathces) throw "no forward matches";
  const firstDigit = parseDigitOrSpeltNumber(forwardMathces[0]);

  // Last number
  const reverseMatches = reverseString(input).match(reverseNumberRegexp);
  if (!reverseMatches) throw "no reverse matches";
  const secondDigit = parseDigitOrSpeltNumber(reverseString(reverseMatches[0]));

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

export function reverseString(input: string): string {
  const outputArray = [];

  for (let i = input.length - 1; i >= 0; i--) {
    outputArray.push(input[i]);
  }

  return outputArray.join("");
}
