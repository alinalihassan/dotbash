import { z } from "zod";
import { ConfigSchema } from "../src/parser";

const jsonSchema = z.toJSONSchema(ConfigSchema);

// Post-process to remove 'required' from fields that have defaults
const removeRequiredForDefaults = (schema: any): any => {
  if (schema.properties) {
    for (const key in schema.properties) {
      const prop = schema.properties[key];
      // If a property has a default value, it shouldn't be required
      if (prop.default !== undefined && schema.required?.includes(key)) {
        schema.required = schema.required.filter((k: string) => k !== key);
      }
      // Recurse into nested objects
      removeRequiredForDefaults(prop);
    }
  }
  // Also handle items in arrays
  if (schema.items) {
    removeRequiredForDefaults(schema.items);
  }
  return schema;
};

const processedSchema = removeRequiredForDefaults(jsonSchema);

// Pretty print and write
Bun.write("schema.json", JSON.stringify(processedSchema, null, 2));
