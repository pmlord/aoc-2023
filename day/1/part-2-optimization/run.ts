import { extractCalibrationNumber } from "./utils.ts";
import { array } from "./script.ts";

export function run(): number {
  let sum = 0;

  for (const str of array) {
    const number: number = extractCalibrationNumber(str);
    sum += number;
  }

  return sum;
}
