import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { textFileToArray, extractCalibrationNumber } from "./utils.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const array = await textFileToArray(`${__dirname}/input.txt`);

let sum = 0;

for (const str of array) {
  const number: number = extractCalibrationNumber(str);
  sum += number;
}

console.log(`Answer is: ${sum}`);
