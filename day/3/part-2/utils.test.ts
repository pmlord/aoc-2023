import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { run } from "./utils.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const text = await Deno.readTextFile(`${__dirname}/input-test.txt`);

Deno.test("run", () => {
  assertEquals(run(text), 467835);
});
