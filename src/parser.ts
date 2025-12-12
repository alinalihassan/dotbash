import { $ } from "bun";
import { z } from "zod";

const DefaultsConfig = z
  .object({
    links: z
      .object({
        // When true, create parent directories to the link as needed. (default: false)
        create: z.boolean().optional().default(false),
        // Removes the old link if it's a symlink (default: false)
        relink: z.boolean().optional().default(false),
        // Force removes the old link, file or folder, and forces a new link (default: false)
        force: z.boolean().optional().default(false),
      })
      .optional(),
  })
  .optional();

const ShellConfigSchema = z.object({
  description: z.string().optional(),
  command: z.string(),
  quiet: z.boolean().optional().default(false),
});

const PackageManagerConfigSchema = z.object({
  // Important for Brew on MacOS
  installSelf: z.boolean().optional().default(true),
  dependenciesFile: z.file(),
});

// Define your config schema with Zod
const ConfigSchema = z.object({
  defaults: DefaultsConfig,
  links: z.record(z.string(), z.string()),
  shell: z.array(ShellConfigSchema),
  packageManager: PackageManagerConfigSchema,
});

type Config = z.infer<typeof ConfigSchema>;

const generateShell = (config: Config): string => {
  var output = "";
  // Generate Links

  return output;
};

export const parseConfig = async (input: string, output: string) => {
  const configFile = Bun.file(input);
  const rawConfig = await configFile.json();

  // Validate the config against the schema and throw if invalid
  const config = ConfigSchema.parse(rawConfig);

  // Now TypeScript knows config is of type Config
  console.log("Config");
  console.log(config);

  const generatedShell = generateShell(config);
  Bun.file(output).write(generatedShell);
};
