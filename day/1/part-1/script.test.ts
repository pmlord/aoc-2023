import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { extractCalibrationNumber, textFileToArray } from "./utils.ts";

const inputs = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const outputs = [12, 38, 15, 77];
const finalOutput = 142;

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

Deno.test("textFileToArray", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const output = await textFileToArray(`${__dirname}/input-test.txt`);

  assertEquals(output, ["hello", "world ", "how are ya?"]);
});
