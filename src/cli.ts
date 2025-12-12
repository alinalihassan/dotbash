import { program } from "commander";
import { parseConfig } from "./parser";

program
  .option("-i, --input <input>", "input file", "dotbash.json")
  .option("-o, --output <output>", "output file", "install.sh");

program.parse(process.argv);

const options = program.opts();

parseConfig(options.input, options.output);
