// Now that my answers are submitted, let's optimize for fun

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { run } from "./run.ts";

Deno.test("Script returns the correct answer", () => {
  assertEquals(run(), 53855);
});
