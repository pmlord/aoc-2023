import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { getValidGamesFromMax, parseLine } from "./utils.ts";
import { MaxDraw } from "./types.ts";
import { testInput } from "./input.ts";

Deno.test("parseLine", () => {
  assertEquals(
    parseLine("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"),
    {
      id: 1,
      draws: [
        { blue: 3, red: 4, green: 0 },
        { red: 1, green: 2, blue: 6 },
        { green: 2, blue: 0, red: 0 },
      ],
    }
  );
  assertEquals(
    parseLine(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
    ),
    {
      id: 3,
      draws: [
        { green: 8, blue: 6, red: 20 },
        { blue: 5, red: 4, green: 13 },
        { green: 5, red: 1, blue: 0 },
      ],
    }
  );
});

Deno.test("getValidGamesFromMax", () => {
  const maxDraw: MaxDraw = { red: 12, green: 13, blue: 14 };

  assertEquals(getValidGamesFromMax(maxDraw, testInput), 8);
});
