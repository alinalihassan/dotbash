import { z } from "zod";
import { ConfigSchema } from "../src/parser";

const jsonSchema = z.toJSONSchema(ConfigSchema);

// Pretty print and write
Bun.write("schema.json", JSON.stringify(jsonSchema, null, 2));
