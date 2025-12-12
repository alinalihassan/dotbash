await Bun.build({
	entrypoints: ["src/cli.ts"],
	outdir: "build",
});
