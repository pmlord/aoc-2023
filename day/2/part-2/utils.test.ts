import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  getMinFromGame,
  getPowerOfDraw,
  getValidGamesFromMax,
  parseLine,
} from "./utils.ts";
import { Draw } from "./types.ts";
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
  const maxDraw: Draw = { red: 12, green: 13, blue: 14 };

  assertEquals(getValidGamesFromMax(maxDraw, testInput), 8);
});

Deno.test("getPowerOfDraw", () => {
  const minDraw: Draw = { red: 4, green: 2, blue: 6 };
  assertEquals(getPowerOfDraw(minDraw), 48);
});

Deno.test("getMinFromGame", () => {
  const answers: Draw[] = [
    { red: 4, green: 2, blue: 6 },
    { red: 1, green: 3, blue: 4 },
    { red: 20, green: 13, blue: 6 },
    { red: 14, green: 3, blue: 15 },
    { red: 6, green: 3, blue: 2 },
  ];

  const games = testInput.map(parseLine);

  games.forEach((game, i) => {
    const min = getMinFromGame(game);
    assertEquals(min, answers[i]);
  });
});

Deno.test("get powers for test input", () => {
  const games = testInput.map(parseLine);
  const mins: Draw[] = games.map(getMinFromGame);
  const sum = mins.reduce((accum, draw) => accum + getPowerOfDraw(draw), 0);
  assertEquals(sum, 2286);
});
