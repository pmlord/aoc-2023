import { input } from "./input.ts";
import { MaxDraw } from "./types.ts";
import { getValidGamesFromMax } from "./utils.ts";

const maxDraw: MaxDraw = { red: 12, green: 13, blue: 14 };

const output = getValidGamesFromMax(maxDraw, input);

console.log(`\nAnswer is: ${output}\n\n`);
