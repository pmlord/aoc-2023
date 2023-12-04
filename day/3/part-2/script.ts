import * as path from "https://deno.land/std@0.208.0/path/mod.ts";
import { run } from "./utils.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const text = await Deno.readTextFile(`${__dirname}/input.txt`);
const answer = run(text);
console.log(`Answer is: ${answer}`);
