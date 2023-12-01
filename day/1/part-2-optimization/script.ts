import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { textFileToArray } from "./utils.ts";
import { run } from "./run.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
export const array = await textFileToArray(`${__dirname}/input.txt`);

const sum = run();
console.log(`Answer is: ${sum}`);
