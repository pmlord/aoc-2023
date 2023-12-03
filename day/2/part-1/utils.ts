import { Draw, GameStruct, MaxDraw, isColor } from "./types.ts";

const colorCountRegex = /(\d+)\s+(red|green|blue)/;

export function parseLine(input: string): GameStruct {
  const [idStr, drawsStr] = input.split(":");
  if (!idStr || !drawsStr) throw "invalid input";

  const idStrMatch = idStr.match(/\d+/)?.[0];
  if (!idStrMatch) throw "invalid input";
  const id = parseInt(idStrMatch);
  if (!id || !Number.isInteger(id)) throw "invalid input";

  const draws: Draw[] = [];
  drawsStr.split(";").forEach((drawStr) => {
    const draw: Draw = { red: 0, blue: 0, green: 0 };

    drawStr.split(",").forEach((colorStr) => {
      const match = colorStr.match(colorCountRegex);
      if (!match) throw "invalid input";
      const [, numberStr, color] = match;
      const number = parseInt(numberStr);
      if (!Number.isInteger(number)) throw "invalid input";

      if (!isColor(color)) throw "invalid input";
      draw[color] = number;
    });

    draws.push(draw);
  });

  return {
    id,
    draws,
  };
}

export function getValidGamesFromMax(
  maxDraw: MaxDraw,
  games: string[]
): number {
  let sum = 0;

  for (const gameStr of games) {
    const game: GameStruct = parseLine(gameStr);
    const isUnder = game.draws.every((draw) => {
      return Object.entries(draw).every(([color, num]) => {
        if (!isColor(color)) return false;
        return num <= maxDraw[color];
      });
    });
    if (isUnder) sum += game.id;
  }

  return sum;
}
