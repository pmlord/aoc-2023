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
export const numberRegexp = new RegExp(`[0-9]|${speltNumbers.join("|")}`, "i");

export function parseDigitOrSpeltNumber(input: string): number {
  const parsedInt = parseInt(input);
  if (Number.isInteger(parsedInt)) return parsedInt;

  if (input in dictionary) {
    return dictionary[input as keyof typeof dictionary];
  }

  return NaN;
}

export function extractCalibrationNumber(input: string): number {
  // parseDigitOrSpeltNumber

  // First number
  let firstDigit: number | undefined = undefined;
  for (let i = 0; i < input.length; i++) {
    const substring = input.substring(i, input.length);
    const match = substring.match(numberRegexp);
    // console.log(`i=${i}`, substring, match);

    const firstMatch = match?.[0];
    if (firstMatch) {
      const parsed = parseDigitOrSpeltNumber(firstMatch);
      if (Number.isInteger(parsed)) {
        firstDigit = parsed;
        break;
      }
    }
  }

  // Last number
  let secondDigit: number | undefined = undefined;
  for (let i = input.length - 1; i >= 0; i--) {
    const substring = input.substring(i, input.length);
    const match = substring.match(numberRegexp);
    // console.log(`i=${i}`, substring, match);

    const firstMatch = match?.[0];
    if (firstMatch) {
      const parsed = parseDigitOrSpeltNumber(firstMatch);
      if (Number.isInteger(parsed)) {
        secondDigit = parsed;
        break;
      }
    }
  }

  if (
    firstDigit === undefined ||
    secondDigit === undefined ||
    !Number.isInteger(firstDigit) ||
    !Number.isInteger(secondDigit)
  )
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
