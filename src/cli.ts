import { program } from "commander";
import { parseConfig } from "./parser";

program
  .option("-i, --input <input>", "input file", "dotbash.yaml")
  .option("-o, --output <output>", "output file", "init.sh");

program.parse(process.argv);

const options = program.opts();

console.log("Input", options.input);
console.log("Output", options.output);

parseConfig(options.input, options.output);
