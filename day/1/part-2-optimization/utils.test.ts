import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import {
  extractCalibrationNumber,
  numberRegexp,
  parseDigitOrSpeltNumber,
  reverseString,
  textFileToArray,
} from "./utils.ts";

const inputs = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];
const outputs = [29, 83, 13, 24, 42, 14, 76];
const finalOutput = 281;

Deno.test("extractCalibrationNumber", () => {
  let sum = 0;

  for (let i = 0; i < inputs.length; i++) {
    const output = extractCalibrationNumber(inputs[i]);
    sum += output;

    // Check that the function's result matches the expected output.
    assertEquals(output, outputs[i]);
  }

  // Check that the total sum matches the expected sum.
  assertEquals(sum, finalOutput);
});

Deno.test("reverseString", () => {
  assertEquals(reverseString("one"), "eno");
  assertEquals(reverseString("hello world"), "dlrow olleh");
  assertEquals(reverseString("eight"), "thgie");
  assertEquals(reverseString("three"), "eerht");
});

Deno.test("extractCalibrationNumber can catch overlaps", () => {
  assertEquals(extractCalibrationNumber("oneight"), 18);
  assertEquals(extractCalibrationNumber("2zoneight"), 28);
  assertEquals(extractCalibrationNumber("threeight"), 38);
  assertEquals(extractCalibrationNumber("fourtythreeight"), 48);
});

Deno.test("numberRegexp", () => {
  assert("zero".match(numberRegexp), 'Tests correctly for "zero"');
  assert("one".match(numberRegexp), 'Tests correctly for "one"');
  assert("two".match(numberRegexp), 'Tests correctly for "two"');
  assert("three".match(numberRegexp), 'Tests correctly for "three"');
  assert("four".match(numberRegexp), 'Tests correctly for "four"');
  assert("five".match(numberRegexp), 'Tests correctly for "five"');
  assert("six".match(numberRegexp), 'Tests correctly for "six"');
  assert("seven".match(numberRegexp), 'Tests correctly for "seven"');
  assert("eight".match(numberRegexp), 'Tests correctly for "eight"');
  assert("nine".match(numberRegexp), 'Tests correctly for "nine"');

  assert("5".match(numberRegexp));
  assert(!"threive".match(numberRegexp));
});

Deno.test("parseDigitOrSpeltNumber", () => {
  assertEquals(parseDigitOrSpeltNumber("0"), 0);
  assertEquals(parseDigitOrSpeltNumber("1"), 1);
  assertEquals(parseDigitOrSpeltNumber("2"), 2);
  assertEquals(parseDigitOrSpeltNumber("3"), 3);
  assertEquals(parseDigitOrSpeltNumber("4"), 4);
  assertEquals(parseDigitOrSpeltNumber("5"), 5);
  assertEquals(parseDigitOrSpeltNumber("6"), 6);
  assertEquals(parseDigitOrSpeltNumber("7"), 7);
  assertEquals(parseDigitOrSpeltNumber("8"), 8);
  assertEquals(parseDigitOrSpeltNumber("9"), 9);

  assertEquals(parseDigitOrSpeltNumber("zero"), 0);
  assertEquals(parseDigitOrSpeltNumber("one"), 1);
  assertEquals(parseDigitOrSpeltNumber("two"), 2);
  assertEquals(parseDigitOrSpeltNumber("three"), 3);
  assertEquals(parseDigitOrSpeltNumber("four"), 4);
  assertEquals(parseDigitOrSpeltNumber("five"), 5);
  assertEquals(parseDigitOrSpeltNumber("six"), 6);
  assertEquals(parseDigitOrSpeltNumber("seven"), 7);
  assertEquals(parseDigitOrSpeltNumber("eight"), 8);
  assertEquals(parseDigitOrSpeltNumber("nine"), 9);
});

Deno.test("textFileToArray", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const output = await textFileToArray(`${__dirname}/input-test.txt`);

  assertEquals(output, ["hello", "world ", "how are ya?"]);
});
