import { input } from "./input.ts";
import { Draw } from "./types.ts";
import { getMinFromGame, getPowerOfDraw, parseLine } from "./utils.ts";

const games = input.map(parseLine);
const mins: Draw[] = games.map(getMinFromGame);
const sum = mins.reduce((accum, draw) => accum + getPowerOfDraw(draw), 0);

console.log(`\nAnswer is: ${sum}\n\n`);
